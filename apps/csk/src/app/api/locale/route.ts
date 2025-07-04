import { NextResponse } from 'next/server';
import localesData from '@/i18n/locales.json';

type Locale = {
  label: string;
  value: string;
};

type Group = {
  name: string;
  locales: Locale[];
};

export async function GET() {
  const { localeNames, localeGroups } = localesData;

  const groupMap = new Map<string, Locale[]>();

  for (const [key, groupName] of Object.entries(localeGroups)) {
    if (!groupMap.has(groupName)) {
      groupMap.set(groupName, []);
    }
    groupMap.get(groupName)!.push({
      label: localeNames[key as keyof typeof localeNames],
      value: key,
    });
  }

  const result: Group[] = Array.from(groupMap.entries()).map(([name, locales]) => ({
    name,
    locales,
  }));

  return NextResponse.json(result);
}
