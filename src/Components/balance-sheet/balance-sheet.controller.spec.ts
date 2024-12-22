import { Test, TestingModule } from '@nestjs/testing';
import { BalanceSheetController } from './balance-sheet.controller';

describe('BalanceSheetController', () => {
  let controller: BalanceSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceSheetController],
    }).compile();

    controller = module.get<BalanceSheetController>(BalanceSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
