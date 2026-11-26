import { describe, it, expect } from 'vitest';
import { formatPostDate } from '../src/utils/dates';

describe('formatPostDate', () => {
  it('exibe a data de calendário sem cair para o dia anterior', () => {
    // Meia-noite UTC: em fuso negativo (build em -03) sem timeZone vira o dia anterior.
    expect(formatPostDate(new Date('2026-01-01T00:00:00Z'), 'long')).toBe('1 de janeiro de 2026');
  });

  it('estilo short mostra mês abreviado e ano', () => {
    expect(formatPostDate(new Date('2026-10-26T00:00:00Z'), 'short')).toBe('out. de 2026');
  });

  it('estilo padrão é o longo', () => {
    expect(formatPostDate(new Date('2026-06-15T00:00:00Z'))).toBe('15 de junho de 2026');
  });
});
