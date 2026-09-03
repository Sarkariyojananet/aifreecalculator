import type { APIRoute } from 'astro';
import { getCalculatorStats } from '../../../lib/db';
import { calculators } from '../../../data/calculators';

export const prerender = false;

export const GET: APIRoute = async () => {
  const stats = await getCalculatorStats();

  const totalCalculators = calculators.length;
  const totalViews = Object.values(stats).reduce((a, b) => a + b, 0);

  const topCalculators = Object.entries(stats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([slug, views]) => {
      const calc = calculators.find((c) => c.slug === slug);
      return {
        slug,
        name: calc ? calc.name : slug,
        category: calc ? calc.category : 'General',
        icon: calc ? calc.icon : '🧮',
        views,
      };
    });

  const categoryBreakdown = {
    Finance: calculators.filter((c) => c.category === 'Finance').length,
    Construction: calculators.filter((c) => c.category === 'Construction').length,
    Health: calculators.filter((c) => c.category === 'Health').length,
    Math: calculators.filter((c) => c.category === 'Math').length,
    General: calculators.filter((c) => c.category === 'General').length,
  };

  return new Response(
    JSON.stringify({
      totalCalculators,
      totalViews,
      topCalculators,
      categoryBreakdown,
      adsenseEnabled: true,
      adsenseClient: 'ca-pub-XXXXXXXXXXXXXXXX',
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
