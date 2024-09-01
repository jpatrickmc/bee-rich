import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { H2 } from '~/components/headings';

const data = [
  {
    id: 1,
    title: 'Food',
    amount: 100,
  },
  {
    id: 2,
    title: 'Transport',
    amount: 20,
  },
  {
    id: 3,
    title: 'Entertainment',
    amount: 50,
  },
];

export function loader({ params }: LoaderFunctionArgs) {
  // find the expense by id and return it
  const { id } = params;
  const expense = data.find((expense) => expense.id === Number(id));
  if (!expense) throw new Response('Not found', { status: 404 });
  return json(expense);
}

// http://localhost:3000/dashboard/expenses/2
export default function Component() {
  const expense = useLoaderData<typeof loader>();
  return (
    <div className="w-full h-full p-8">
      <H2>{expense.title}</H2>
      <p>{expense.amount}</p>
    </div>
  );
}
