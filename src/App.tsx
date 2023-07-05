// @ts-nocheck
import React, {useState} from 'react';
import './App.css';
import {ThreeCommasApiClient} from './libs/client/index';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const HmacDemo = () => {
  const [requestParams, setRequestParams] = useState<{response: never, valuesForSignature: {
      signatureValue: string,
      secret: string,
      pathname: string,
      body: string,
    }}>();
  const [postRequestParams, setPostRequestParams] = useState<{response: never, valuesForSignature: {
      signatureValue: string,
      secret: string,
      pathname: string,
      body: string,
    }}>();

  const [accountId, setAccountId] = useState('30973258');
  const [accountNewName, setAccountNewName] = useState('valery777');
  const [apiKey, setApiKey] = useState('');
  const [secret, setSecret] = useState('');

  return (
    <>
      <div className='wrapper'>
        <div>
          <h1 style={{marginBottom: '20px'}}>
            To calculate the signature, HmacSHA256 is used and the Hex encoding JS example is as follows:
          </h1>
         <div style={{display: 'flex', flexDirection: 'column', marginBottom: '30px'}}>
           <SyntaxHighlighter
             language="javascript"
             showLineNumbers
           >
             {`import HmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";

const signature = (secret, url, params) => {
  const message = params ? \`\${url}?\${params}\` : url;
  return HmacSHA256(message, secret).toString(Hex)
}`}

           </SyntaxHighlighter>
           <div style={{margin: 20}}>* <strong>params</strong> is body in stringified JSON format for POST and query string for GET</div>
           <h3 style={{color: 'red',margin: 20}}>* You must add the signature and apiKey to the headers of the request.</h3>
         </div>
        </div>
        <div className='fieldsWrapper'>
          <span className='label'>API KEY:</span>
          <input className='key_input' type="text" value={apiKey} onChange={({target: {value}}) => setApiKey(value)}/>
        </div>
        <div className='fieldsWrapper'>
          <span className='label'>SECRET:</span>
          <input className='key_input' type="text" value={secret} onChange={({target: {value}}) => setSecret(value)}/>
        </div>
      </div>
      <div className="App">
            <div className='requestBlock'>
              <h1>Get Account</h1>
              <div className='fieldsWrapper'>
                <span className='label'>Account_id:</span>
                <input type="text" value={accountId} onChange={({target: {value}})=>setAccountId(value)}/>
              </div>
              <div>
                <div className='fieldsWrapper'>
                  <span className='label'>Url:</span>
                  <span>https://api.3commas.io{requestParams?.valuesForSignature.pathname}</span>
                </div>
                <div className='fieldsWrapper'>
                  <span className='label'>Params:</span>
                  <span className='value'>
                    {requestParams?.valuesForSignature.body}
                  </span>
                </div>
                <div className='fieldsWrapper'>
                  <span className='label'>Signature value:</span>
                  <span>{requestParams?.valuesForSignature.signatureValue}</span>
                </div>
              </div>
              <button
                className='testButton'
                onClick={async () => {
                  const client = new ThreeCommasApiClient({
                    key: apiKey,
                    secret,
                  });
                  const res = await client.fetch(`/ver1/accounts/${accountId}`,'get', null);
                  setRequestParams(res);
                }
              }>
                GET
              </button>
            </div>
        <div className='requestBlock'>
          <h1>Post Rename Account</h1>
          <div>
            <div className='fieldsWrapper'>
              <span className='label'>Account_id:</span>
              <input type="text" value={accountId} onChange={({target: {value}})=>setAccountId(value)}/>
            </div>
            <div className='fieldsWrapper'>
              <span className='label'>Body data(name):</span>
              <input type="text" value={accountNewName} onChange={({target: {value}})=>setAccountNewName(value)}/>
            </div>
          </div>
          <div>
            <div className='fieldsWrapper'>
              <span className='label'>Url:</span>
              <span>https://api.3commas.io{postRequestParams?.valuesForSignature.pathname}</span>
            </div>
            <div className='fieldsWrapper'>
              <span className='label'>Body:</span>
              <span>
                 <SyntaxHighlighter
                   language="javascript"
                   showLineNumbers
                 >
                  {postRequestParams?.valuesForSignature.body}
                 </SyntaxHighlighter>
              </span>
            </div>
            <div className='fieldsWrapper'>
              <span className='label'>Signature value:</span>
              <span>{postRequestParams?.valuesForSignature.signatureValue}</span>
            </div>
          </div>
          <button
            className='testButton'
            onClick={async () => {
              const client = new ThreeCommasApiClient({
                key: apiKey,
                secret,
              });
              const res = await client.fetch(`/ver1/accounts/${accountId}/rename`,'post',{
                account_id: accountId
              },{
                name: accountNewName
              })
              setPostRequestParams(res);
            }
          }>
            POST
          </button>
        </div>
      </div>
    </>
  );
};

const RsaDemo  = () => {

  return (
    <div className="wrapper">
        <SyntaxHighlighter
          language="javascript"
          showLineNumbers
        >
        {`const crypto = require('crypto');
const rsaSignature = (privateKey, url, { queryString = '', requestBody = '' } = {}) => {
  const sign = crypto.createSign("RSA-SHA256");
  if (queryString) {
    sign.update(url + "?" + queryString + requestBody);
  } else {
    sign.update(url + requestBody);
  }
  sign.end();

  return sign.sign(privateKey, 'base64');
}`}
        </SyntaxHighlighter>
      <iframe width="90%" height="1000"
              src="https://codesandbox.io/p/sandbox/objective-roman-j94v8w?embed=1" allowFullScreen></iframe>
    </div>
    )
}

const App = () => {
  const [demoType, setDemoType] = useState("system-generated")

  return (
    <>
      <div style={{
        display: 'block',
        margin: "30px auto 0",
        width: 'fit-content'
      }}>
        <p>Api key type:</p>
        <button
          disabled={
            demoType === 'system-generated'
          }
          onClick={() => {
            setDemoType("system-generated")
          }}
          style={{marginRight: 10}}
        >System-generated</button>
        <button
          disabled={
            demoType === 'self-generated'
          }
          onClick={() => {
          setDemoType("self-generated")
        }}>Self-generated</button>
      </div>
      {
        demoType === 'system-generated'
          ? <HmacDemo />
          : <RsaDemo />
      }
    </>
  )
}

export default App;
