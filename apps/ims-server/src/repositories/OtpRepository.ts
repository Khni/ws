import { IOtpRepository, OtpType } from '@khaled/auth'
import prisma from '../database/prisma.js'

export class OtpRepository implements IOtpRepository {
	async create(data: { email: string; otp: string; expiredIn: Date; type: OtpType }) {
		const otp = await prisma.otp.create({
			data,
		})

		return otp
	}
	async findRecent(params: { email: string; otpType: OtpType }) {
		const otpRecord = await prisma.otp.findFirst({
			where: { email: params.email, type: params.otpType },
			orderBy: { createdAt: 'desc' },
		})

		return otpRecord
	}
}
