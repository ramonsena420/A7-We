// consumo_agua.controller.ts
import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAgua } from './consumo_agua.model';

@Controller('consumo-agua')
export class ConsumoAguaController {
  constructor(private readonly consumoAguaService: ConsumoAguaService) {}

  // Endpoint para registrar consumo
  @Post('registrar')
  registrarConsumo(@Body() consumo: ConsumoAgua): ConsumoAgua {
    return this.consumoAguaService.registrarConsumo(consumo);
  }

  // Endpoint para consultar histórico de consumo por período
  @Get('historico/:userId')
  consultarHistorico(
    @Param('userId') userId: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ): ConsumoAgua[] {
    return this.consumoAguaService.consultarHistorico(
      userId,
      new Date(dataInicio),
      new Date(dataFim),
    );
  }

  // Endpoint para verificar se há consumo elevado
  @Get('alerta/:userId')
  verificarConsumoElevado(@Param('userId') userId: string): { alerta: boolean } {
    const alerta = this.consumoAguaService.verificarConsumoElevado(userId);
    return { alerta };
  }
}
