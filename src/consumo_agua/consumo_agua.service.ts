// consumo_agua.service.ts
import { Injectable } from '@nestjs/common';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
  private registros: ConsumoAgua[] = [];

  // Registro de consumo de água
  registrarConsumo(consumo: ConsumoAgua): ConsumoAgua {
    consumo.id = new Date().valueOf().toString();
    this.registros.push(consumo);
    return consumo;
  }

  // Consulta de histórico de consumo por período
  consultarHistorico(userId: string, dataInicio: Date, dataFim: Date): ConsumoAgua[] {
    return this.registros.filter(
      (registro) =>
        registro.userId === userId &&
        registro.dataLeitura >= dataInicio &&
        registro.dataLeitura <= dataFim,
    );
  }

  // Geração de alertas para consumo elevado
  verificarConsumoElevado(userId: string): boolean {
    const registrosUsuario = this.registros
      .filter((registro) => registro.userId === userId)
      .sort((a, b) => b.dataLeitura.getTime() - a.dataLeitura.getTime());

    if (registrosUsuario.length < 2) return false;

    const [ultimoMes, penultimoMes] = registrosUsuario;
    return ultimoMes.quantidade > penultimoMes.quantidade;
  }
}
