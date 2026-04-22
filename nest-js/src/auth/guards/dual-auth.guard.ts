import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class DualAuthGuard extends AuthGuard(['jwt', 'auth0-jwt']) {}