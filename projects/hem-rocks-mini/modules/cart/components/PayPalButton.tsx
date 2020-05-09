import React, { ReactElement, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
// @ts-ignore
import scriptLoader from 'react-async-script-loader'

declare const paypal: any

interface IProps {
  client: any
  commit: boolean
  currency: string
  env: string
  isScriptLoaded: boolean
  isScriptLoadSucceed: boolean
  onCancel: () => void
  onError: () => void
  onSuccess: (payment: any) => void
  total: number
}

function PayPalButton({
  client,
  commit,
  currency,
  env,
  isScriptLoaded,
  isScriptLoadSucceed,
  onCancel,
  onError,
  onSuccess,
  total,
 }: IProps): ReactElement {
  const [showButton, setShowButton] = useState(false)

  useEffect(function init() {
    window.React = React
    window.ReactDOM = ReactDOM
  })

  useEffect(function onPayPalReady() {
    if (isScriptLoaded && isScriptLoadSucceed) {
      setShowButton(true)
    }
  }, [isScriptLoaded, isScriptLoadSucceed])

  const payment = () =>
    paypal.rest.payment.create(env, client, {
      transactions: [
        {
          amount: {
            total,
            currency,
          }
        },
      ],
    })

  const onAuthorize = (data: any, actions: any) =>
    actions.payment.execute()
      .then(() => {
        const payment = {
          paid: true,
          cancelled: false,
          payerID: data.payerID,
          paymentID: data.paymentID,
          paymentToken: data.paymentToken,
          returnUrl: data.returnUrl,
        }

        onSuccess(payment)
      })

  return (
    <div>
      { showButton && <paypal.Button.react
        env={env}
        client={client}
        commit={commit}
        payment={payment}
        onAuthorize={onAuthorize}
        onCancel={onCancel}
        onError={onError}
      />
    }
    </div>
  )
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PayPalButton)
