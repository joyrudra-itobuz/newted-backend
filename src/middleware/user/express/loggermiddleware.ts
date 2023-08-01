import { RequestHandler } from 'express';

const loggerMiddleware: RequestHandler = (req, res, next) => {
  const { method, url, query, body, headers } = req;

  // Log the incoming request information
  console.log('-----------------------------------------');
  console.log(`New Request!`);
  console.log(`Method: ${method}`);
  console.log(`URL: ${url}`);
  console.log(`Query Parameters: ${JSON.stringify(query)}`);
  console.log(`Request Body: ${JSON.stringify(body)}`);
  console.log(`Headers: ${JSON.stringify(headers)}`);
  console.log('-----------------------------------------');

  // Continue to the next middleware in the chain

  next();
};

export default loggerMiddleware;
