// @ts-nocheck
import React, { useState} from 'react';
import './App.css';
import { ThreeCommasApiClient} from './libs/client/index';

function App() {
  const [response, setResponse] = useState<{response: never, valuesForSignature: {
      signatureValue: string,
      secret: string,
      pathname: string,
      body: string,
    }}>();
  const [responsePost, setResponsePost] = useState<{response: never, valuesForSignature: {
      signatureValue: string,
      secret: string,
      pathname: string,
      body: string,
    }}>();

  const [path, setPath] = useState('account');
  const [accountId, setAccountId] = useState(30973258);
  const [accountNewName, setAccountNewName] = useState('valery777');
  const [apiKey, setApiKey] = useState('');
  const [secret, setSecret] = useState('');


  return (
      <>
        <div className='wrapper'>
          <div>
            <h1 style={{marginBottom: '20px'}}>
              To calculate the signature, HmacSHA256 is used and the Hex encoding JS example is as follows:</h1>
           <div style={{display: 'flex', flexDirection: 'column', marginBottom: '30px'}}>
             <code>import HmacSHA256 from "crypto-js/hmac-sha256";</code>
             <code>import Hex from "crypto-js/enc-hex";</code>
             <code>{`const signature = (secret: string, url: string, params?: string) =>`}</code>
             <code style={{paddingLeft: '15px'}}>{'HmacSHA256(`params ? `${url}?${params}` : url`, secret).toString(Hex)'}</code>
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
                  <span className='label'>Path:</span>
                  <input disabled type="text" value={path} onChange={({target: {value}})=>setPath(value)}/>
                </div>
                <div className='fieldsWrapper'>
                  <span className='label'>Account_id:</span>
                  <input type="text" value={accountId} onChange={({target: {value}})=>setAccountId(value)}/>
                </div>
                <div>
                  <div className='fieldsWrapper'>
                    <span className='label'>Url:</span>
                    <span>
           https://api.3commas.io{response?.valuesForSignature.pathname}
         </span>
                  </div>
                  <div className='fieldsWrapper'>
                    <span className='label'>Params:</span>
                    <span className='value'>
           {response?.valuesForSignature.body}
         </span>
                  </div>
                  <div className='fieldsWrapper'>
                    <span className='label'>Signature value:</span>
                    <span>{response?.valuesForSignature.signatureValue}</span>
                  </div>
                </div>
                <button className='testButton' onClick={async () => {
                  const client = new ThreeCommasApiClient({
                    key: apiKey,
                    secret,
                  });
                  const res = await client.fetch(path,'get', {
                    account_id:accountId,
                  }, null);
                  setResponse(res);
                }}>GET</button>
              </div>
          <div className='requestBlock'>
            <h1>Post Rename Account</h1>
            <div className='fieldsWrapper'>
              <span className='label'>Path:</span>
              <input disabled type="text" value='account.rename'/>
            </div>
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
                <span>
           https://api.3commas.io{responsePost?.valuesForSignature.pathname}
         </span>
              </div>
              <div className='fieldsWrapper'>
                <span className='label'>Body:</span>
                <span>
           <textarea value={responsePost?.valuesForSignature.body}>
             {responsePost?.valuesForSignature.body}
           </textarea>
         </span>
              </div>
              <div className='fieldsWrapper'>
                <span className='label'>Signature value:</span>
                <span>{responsePost?.valuesForSignature.signatureValue}</span>
              </div>
            </div>
            <button className='testButton' onClick={async () => {
              const client = new ThreeCommasApiClient({
                key: apiKey,
                secret,
              });
              const res = await client.fetch('account.rename','post',{
                account_id: accountId
              },{
                name: accountNewName
              })
              setResponsePost(res);
            }}>POST</button>
          </div>
        </div>
      </>
  );
}

export default App;
