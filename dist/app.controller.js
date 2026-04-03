"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = exports.AppController = exports.CatsController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const create_cat_dto_1 = require("./users/dto/create-cat.dto");
const email_service_1 = require("./email/email.service");
let CatsController = class CatsController {
    create(createCatDto) {
        return createCatDto;
    }
};
exports.CatsController = CatsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cat_dto_1.CreateCatDto]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "create", null);
exports.CatsController = CatsController = __decorate([
    (0, common_1.Controller)('cats')
], CatsController);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
let EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async queueWelcome(to) {
        return this.emailService.sendWelcomeEmail(to);
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('welcome'),
    __param(0, (0, common_1.Body)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "queueWelcome", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
//# sourceMappingURL=app.controller.js.map