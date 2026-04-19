"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const user_entity_1 = require("./users/entities/user.entity");
async function seed() {
    await data_source_1.AppDataSource.initialize();
    const repo = data_source_1.AppDataSource.getRepository(user_entity_1.UserEntity);
    await repo.save([
        { name: 'David', email: 'david@test.com' },
        { name: 'Alice', email: 'alice@test.com' },
    ]);
    await data_source_1.AppDataSource.destroy();
}
seed();
//# sourceMappingURL=seed.js.map