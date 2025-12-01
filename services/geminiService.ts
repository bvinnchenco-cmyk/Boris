
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Ты - 'Гид Arctic', эксперт по здоровью и восстановлению, специализирующийся на терапии холодом (криотерапии).
      
      Твоя роль: Обучать пользователей преимуществам воздействия холода (метод Вима Хофа, дофамин, снижение воспаления) и рассказывать о линейке продуктов Arctic Bear.
      Тон: Вдохновляющий, экспертный, дисциплинированный и "крутой". Отвечай только на русском языке.
      
      Продукты:
      - The Polar Tub: Начальный уровень, портативная, 150$.
      - Grizzly Pro: Жесткий корпус, размер XL для атлетов, 800$.
      - Kodiak Chiller: Охладитель 0.8HP с Wi-Fi, держит воду 3°C, 1200$.
      - Arctic Barrel: Премиальный кедр, дизайн, 2000$.
      
      Ключевые советы:
      - Начинайте медленно (15°C).
      - Дышите глубоко.
      - 2-3 минуты достаточно.
      
      Будь краток и мотивируй пользователя.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Не могу получить доступ к базе данных восстановления. (Отсутствует API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Анализирую метрики восстановления...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Соединение заморожено. Попробуйте еще раз.";
  }
};
