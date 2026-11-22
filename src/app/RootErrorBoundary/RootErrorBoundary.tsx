import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export default function RootErrorBoundary() {
  const error = useRouteError();

  let title = 'An error occurred';
  let message = 'Try refreshing the page or going back to the homepage.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    if (typeof error.data === 'string') {
      message = error.data;
    } else if (error.data != null) {
      message = String(error.data);
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main role="alert" style={{ padding: '2rem', maxWidth: '36rem' }}>
      <h1>{title}</h1>
      <p>{message}</p>
      <p>
        <Link to="/">Go to homepage</Link>
      </p>
    </main>
  );
}
