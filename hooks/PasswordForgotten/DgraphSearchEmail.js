import { sendRecoveryEmail } from './sendRecoveryEmail';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphSearchEmail = async (form, setError, setSuccessMessage) => {
 const { email } = form;

 async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(endpoint, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    query: operationsDoc,
    variables: variables,
    operationName: operationName,
   }),
  });

  return await result.json();
 }

 const operationsDoc = `
     query MyQuery($email:String!) {
       queryAuthors(filter: {email: {eq: $email}}) {
         email
       }
     }
   `;

 function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, 'MyQuery', { email: email });
 }

 async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();
  const { queryAuthors } = data;

  if (errors) {
   console.error(errors);
  }

  if (queryAuthors.length === 0) {
   return setError('Email not found');
  } else {
   sendRecoveryEmail(email);
   setSuccessMessage(true);
   return setError(false);
  }
 }

 return await startFetchMyQuery();
};
