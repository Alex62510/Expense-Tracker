export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface RawInsight {
  type?: string;
  title?: string;
  message?: string;
  action?: string;
  confidence?: number;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'info' | 'success' | 'tip';
  title: string;
  message: string;
  action?: string;
  confidence: number;
}

const VALID_INSIGHT_TYPES: AIInsight['type'][] = [
  'warning',
  'info',
  'success',
  'tip',
];

// ------------------ INSIGHTS ------------------
export async function generateExpenseInsights(
  expenses: ExpenseRecord[],
  lang: string = 'en',
): Promise<AIInsight[]> {
  try {
    const expensesSummary = expenses.map((e) => ({
      amount: e.amount,
      category: e.category,
      description: e.description,
      date: e.date,
    }));

    const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights.
Respond in ${lang === 'ru' ? 'Russian' : 'English'}.
Use the following currency for '$'.
Return a JSON array of insights with this structure:
{
  "type": "warning|info|success|tip",
  "title": "Brief title",
  "message": "Detailed insight message with specific numbers when possible",
  "action": "Actionable suggestion",
  "confidence": 0.8
}

Expense Data:
${JSON.stringify(expensesSummary, null, 2)}

Focus on:
1. Spending patterns (day of week, categories)
2. Budget alerts (high spending areas)
3. Money-saving opportunities
4. Positive reinforcement for good habits

Return only valid JSON array, no additional text.`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a financial advisor AI that analyzes spending patterns and provides actionable insights. Always respond with valid JSON only.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await res.json();
    let responseText = data.choices?.[0]?.message?.content || '[]';

    // Убираем markdown ```json
    responseText = responseText.replace(/^```json\s*|\s*```$/g, '');

    const insightsRaw: RawInsight[] = JSON.parse(responseText);

    const insights: AIInsight[] = insightsRaw.map((insight, idx) => ({
      id: `ai-${Date.now()}-${idx}`,
      type: VALID_INSIGHT_TYPES.includes(insight.type as AIInsight['type'])
        ? (insight.type as AIInsight['type'])
        : 'info',
      title: insight.title || (lang === 'ru' ? 'AI инсайт' : 'AI Insight'),
      message:
        insight.message ||
        (lang === 'ru' ? 'Анализ завершён' : 'Analysis complete'),
      action: insight.action,
      confidence: insight.confidence ?? 0.8,
    }));

    return insights;
  } catch (err) {
    console.error('❌ Error generating AI insights:', err);
    return [
      {
        id: 'fallback-1',
        type: 'info',
        title: lang === 'ru' ? 'Анализ недоступен' : 'AI Analysis Unavailable',
        message:
          lang === 'ru'
            ? 'Не удалось сгенерировать инсайты. Попробуйте позже.'
            : 'Unable to generate personalized insights at this time. Please try again later.',
        action: lang === 'ru' ? 'Обновить инсайты' : 'Refresh insights',
        confidence: 0.5,
      },
    ];
  }
}

// ------------------ CATEGORIZE ------------------
export async function categorizeExpense(
  description: string,
  lang: string = 'en',
): Promise<string> {
  try {
    const categoriesEn = [
      'Food',
      'Transportation',
      'Entertainment',
      'Shopping',
      'Bills',
      'Healthcare',
      'Other',
    ];
    const categoriesRu = [
      'Еда',
      'Транспорт',
      'Развлечения',
      'Покупки',
      'Коммунальные платежи',
      'Здоровье',
      'Другое',
    ];
    const categories = lang === 'ru' ? categoriesRu : categoriesEn;

    const prompt = `Categorize this expense: "${description}". Respond with only the category name from: ${categories.join(', ')}.`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0,
        max_tokens: 10,
      }),
    });

    const data = await res.json();
    const category = (data.choices?.[0]?.message?.content || '').trim();
    return categories.includes(category)
      ? category
      : categories[categories.length - 1];
  } catch (err) {
    console.error('❌ Error categorizing expense:', err);
    return lang === 'ru' ? 'Другое' : 'Other';
  }
}

// ------------------ GENERATE ANSWER ------------------
export async function generateAIAnswer(
  question: string,
  context: ExpenseRecord[],
  lang: string = 'en',
): Promise<string> {
  try {
    const expensesSummary = context.map((e) => ({
      amount: e.amount,
      category: e.category,
      description: e.description,
      date: e.date,
    }));

    const prompt = `Based on the following expense data, provide a detailed and actionable answer to this question (reply in ${
      lang === 'ru' ? 'Russian' : 'English'
    }): "${question}"
    
Use the following currency for '$'.

Question: "${question}"

Expense Data:
${JSON.stringify(expensesSummary, null, 2)}

Provide a comprehensive answer that:
1. Addresses the specific question directly
2. Uses concrete data from the expenses when possible
3. Offers actionable advice
4. Keeps the response concise but informative (2-3 sentences)

Return only the answer text, no additional formatting.`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await res.json();

    // Обрабатываем оба варианта ответа
    const choice = data.choices?.[0];
    const response = (choice?.message?.content || choice?.text || '').trim();

    if (!response) throw new Error('No response from AI');

    return response;
  } catch (err) {
    console.error('❌ Error generating AI answer:', err);
    return lang === 'ru'
      ? 'Сейчас не удаётся получить подробный ответ. Попробуйте обновить инсайты или проверьте подключение.'
      : "I'm unable to provide a detailed answer at the moment. Please try refreshing the insights or check your connection.";
  }
}
