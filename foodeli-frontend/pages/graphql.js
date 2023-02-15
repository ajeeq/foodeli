// importing apollo client
// npm install @apollo/client
import { gql, useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useRouter } from 'next/router'

const GraphqlData = () => {
  const router = useRouter();

  // variable state
  const[emailVendor, setEmailVendor] = useState('');
  const[passwordVendor, setPasswordVendor] = useState('');
  const[vendorName, setVendorName] = useState('');
  const[vendorDesc, setVendorDesc] = useState('');
  const[vendorPhoneNum, setVendorPhoneNum] = useState('');

  const[emailCustomer, setEmailCustomer] = useState('');
  const[passwordCustomer, setPasswordCustomer] = useState('');
  const[firstNameCustomer, setFirstNameCustomer] = useState('');
  
  // const QUERY = gql`
  //   {
  //     articles {
  //       title
  //       body
  //       createdAt
  //     }
  //   }
  // `;

  // const ADD_ARTICLE = gql`
  //   mutation {
  //     createArticle(article: {
  //       title: "${title}", 
  //       body: "${body}"
  //       }) 
  //       {
  //         title
  //         body
  //         createdAt
  //       }
  //   }
  // `;

  const GET_VENDOR = gql`
    query {
      vendors{
        _id
        email
      }
    }
  `;

  const GET_CUSTOMER = gql`
    query {
      customers{
        _id
        email
      }
    }
  `;

  const ADD_VENDOR = gql`
    mutation {
      createVendor(vendorInput: {
        email: "${emailVendor}", 
        password: "${passwordVendor}"
      }) 
      {
        email
      }
    }
  `;

  const ADD_CUSTOMER = gql`
    mutation {
      createCustomer(customerInput: {
        email: "${emailCustomer}",
        password: "${passwordCustomer}",
        firstName: "${firstNameCustomer}"
      }) 
      {
        email
      }
    }
  `;

  const allVendor = useQuery(GET_VENDOR);
  const allCustomer = useQuery(GET_CUSTOMER);
  const [createVendor, { error: error_vendor }] = useMutation(ADD_VENDOR);
  const [createCustomer, { error: error_customer }] = useMutation(ADD_CUSTOMER);

  try {
    if (
      (allVendor.loading || !allVendor.data) || 
      (allCustomer.loading || !allCustomer.data)) {
        return <h1>loading...</h1>;
    }
    else {
      // submit mutation function
      const submit_vendor = async (event) => {
        event.preventDefault();
        await createVendor({ variables: { emailVendor, passwordVendor } })

        setEmailVendor('')
        setPasswordVendor('')

        router.reload();
      }

      // submit mutation function
      const submit_customer = async (event) => {
        event.preventDefault();
        await createCustomer({ variables: { emailCustomer, passwordCustomer, firstNameCustomer } })

        setEmailCustomer('')
        setPasswordCustomer('')
        setFirstNameCustomer('')

        router.reload();
      }

      return (
        <div>

          {/* mutation form */}
          {/* <h1>New Article</h1>
          <form onSubmit={submit}>
            <div>
              Title <input type="text" value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              Body <input type="text" value={body}
                onChange={({ target }) => setBody(target.value)}
              />
            </div>
            
            <button type="submit">Add article!</button>
          </form> */}

          {/* vendor mutation form */}
          {/* <form onSubmit={submit}>
            <h1>Vendor form sample</h1>
            <div>
              Email <input type="text" value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div>
              Password <input type="current-password" value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            
            <button type="submit">Add vendor</button>
          </form> */}

          <h1>Vendor:</h1>

          <form onSubmit={submit_vendor}>
            <div>
              Email <input type="text" 
                onChange={(event) => setEmailVendor(event.target.value)} 
              />
            </div>

            <div>
              Password <input type="password" autoComplete="on" onChange={(event) => setPasswordVendor(event.target.value)} />
            </div>

            <button type="submit">Register new vendor</button>
          </form>
          

          
          {/* display query data */}
          {/* {data.articles.map(({ id, title, body, createdAt }) => (
            <ul>
              <li key={id}>{title}</li>
              <li key={id}>{body}</li>
              <li key={id}>{createdAt}</li>
            </ul>
          ))} */}

          <h3>List of Vendor:</h3>
          <ul>
            {allVendor.data.vendors.map(({ _id, email }) => (
              <li key={_id}>{email}, _id: {_id}</li>
            ))}
          </ul>

          
          {/* {data.vendors.map(({ _id, email, password }) => {(
            <React.Fragment key={_id}>
              <ul>
                <li>{email}</li>
              </ul>
            </React.Fragment>
            )}
          )} */}

          <h1>Customer:</h1>

          <form onSubmit={submit_customer}>
            <div>
              Email <input type="text" 
                onChange={(event) => setEmailCustomer(event.target.value)} 
              />
            </div>

            <div>
              First Name <input type="text" 
                onChange={(event) => setFirstNameCustomer(event.target.value)} 
              />
            </div>

            <div>
              Password <input type="password" autoComplete="on" onChange={(event) => setPasswordCustomer(event.target.value)} />
            </div>

            <button type="submit">Register new customer</button>
          </form>

          <h3>List of Customer:</h3>
          <ul>
            {allCustomer.data.customers.map(({ _id, email }) => (
              <li key={_id}>{email}, _id: {_id}</li>
            ))}
          </ul>


        </div>
      );
    };
  }
  catch(err) {
    return (
      <div>
        <h1>{err},</h1>
        <h1>{error_customer}</h1>
        <h1>{error_vendor}</h1>
      </div>
    );
  }

}

export default GraphqlData;