"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIsActive1775182566541 = void 0;
class AddIsActive1775182566541 {
    constructor() {
        this.name = 'AddIsActive1775182566541';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "isActive"`);
    }
}
exports.AddIsActive1775182566541 = AddIsActive1775182566541;
//# sourceMappingURL=1775182566541-AddIsActive.js.map