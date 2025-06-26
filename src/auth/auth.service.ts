import { BadRequestException, Inject, Injectable, Body } from '@nestjs/common';
import { RegisterAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import * as bcryptjs from "bcryptjs"
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { generateFiveDigitCode } from 'src/common/generateCode';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Response } from 'express';
import tempMail from 'src/common/tempMail';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService,
    private readonly mailService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }


  async register(registerAuthDto: RegisterAuthDto) {
    const code = generateFiveDigitCode()
    let defaultUser: any = null
    const hash = await bcryptjs.hash(registerAuthDto?.password, 12)

    console.log(registerAuthDto);
    if (registerAuthDto?.phonenumber) {
      const exist = await this.userModel.findOne({ phonenumber: registerAuthDto.phonenumber })

      if (exist && exist.verified) {
        throw new BadRequestException("Phone oldin foydalanilgan")
      }

      if (!exist) {
        const user = await this.userModel.create({ ...registerAuthDto, password: hash })
        defaultUser = user
      }


      defaultUser = exist

      const message = `Sizning emailingizni taqdiqlash kodingiz - ${code}`;

      console.log(code);
      await this.cacheManager.set(String(defaultUser._id), { code, ...defaultUser }, 60000);

    }

    if (registerAuthDto?.email) {
      const exist = await this.userModel.findOne({ email: registerAuthDto.email })

      if (exist && exist.verified) {
        throw new BadRequestException("Email oldin foydalanilgan")
      }

      if (!exist) {
        const user = await this.userModel.create({ ...registerAuthDto, password: hash })
        defaultUser = user
      }



      defaultUser = exist
      console.log(defaultUser);
      const message = `Sizning emailingizni taqdiqlash kodingiz - ${code}`;

      try {
        const res = await this.mailService.sendMail({
          from: 'Sale producr',
          to: registerAuthDto.email,
          subject: `How to Send Emails with Nodemailer`,
          html: tempMail(code)
        });
      } catch (error) {
      }

      await this.cacheManager.set(String(defaultUser._id), { code, ...defaultUser }, 60000);

    }

    return defaultUser

  }

  async verify(body: any) {
    const value: any = await this.cacheManager.get(String(body._id));
    if (body?.code == value?.code) {
      await this.userModel.findByIdAndUpdate(body._id, { verified: true })
      return { success: true, msg: "" }
    }

    return { success: false, msg: "" }

  }
  async me(req: any) {
    const user = await this.userModel.findById(req.user.id).select("-password -__v");
    if (!user) {
      throw new BadRequestException("Foydalanuvchi topilmadi!")
    }
    return user
  }


  async login(res: Response, loginDto: LoginDto) {
    if (!loginDto.phonenumber && !loginDto.email) {
      throw new BadRequestException("Telefon raqam yoki email kiritilishi shart!")
    }
    if (!loginDto.password) {
      throw new BadRequestException("Parol kiritilishi shart!")
    }

    if (loginDto.phonenumber && loginDto.email) {
      throw new BadRequestException("Telefon raqam yoki email kiritilishi shart!")
    }
    if (loginDto.phonenumber) {


      const user = await this.userModel.findOne({ phonenumber: loginDto.phonenumber, verified: true });
      if (!user) {
        return { message: 'Foydalanuvchi topilmadi' };
      }
      const isMatch = await bcryptjs.compare(loginDto.password, user.password);

      if (!isMatch) {
        return { message: 'Parol noto‘g‘ri!' };
      }
      const payload = { id: user._id, role: user?.role }

      const token = this.jwtService.sign(payload, { secret: "secret" })

      const expirationDate = new Date(Date.now() + 60 * 60000); // 60 minute from now

      res.cookie('token', token, { httpOnly: true, secure: true, expires: expirationDate })
      res.json(
        {
          message: 'Tizimga muvaffaqiyatli kirdingiz!',
          user, token
        }
      )
    }
    if (loginDto.email) {

      console.log(loginDto);
      const user = await this.userModel.findOne({ email: loginDto.email, verified: true });
      console.log(user);
      if (!user) {
        throw new BadRequestException("FOydalanuvchi topilmadi!")
      }
      console.log("email");
      const isMatch = await bcryptjs.compare(loginDto.password, user.password);

      if (!isMatch) {
        throw new BadRequestException("Parol notogri!")
      }
      const payload = { id: user._id, role: user?.role }

      const token = this.jwtService.sign(payload, { secret: "secret" })

      const expirationDate = new Date(Date.now() + 60 * 60000); // 60 minute from now

      res.cookie('token', token, { httpOnly: true, secure: true, expires: expirationDate })
      res.json(
        {
          message: 'Tizimga muvaffaqiyatli kirdingiz!',
          user, token
        }
      )
    }


  }



  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: LoginDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
