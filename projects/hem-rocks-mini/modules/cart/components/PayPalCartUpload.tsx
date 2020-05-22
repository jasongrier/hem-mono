import React, { ReactElement } from 'react'

interface IItem {
  amount: number
  name: string
  slug: string
}

interface IProps {
  items: IItem[]
}

function PayPalCartUpload({ items }: IProps): ReactElement {
  const hostName = window.location.hostname === 'localhost'
    ? 'http://localhost:1234/'
    : 'http://hem.rocks'

  return (
    <div className="pay-pal-cart-upload">
      <form
        // action="https://www.paypal.com/cgi-bin/webscr"
        action="https://www.sandbox.paypal.com/cgi-bin/webscr"
        id="pay-pal-cart-upload-form"
        method="post"
      >
        <input type="hidden" name="cmd" value="_cart" />
        <input type="hidden" name="currency_code" value="EUR" />
        <input type="hidden" name="upload" value="1" />
        {/* <input type="hidden" name="business" value="paypal@hem.rocks" /> */}
        <input type="hidden" name="business" value="sb-d7jtv1699928@business.example.com" />
        <input type="hidden" name="image_url" value="http://static.hem.rocks/hem-rocks/paypal/store_banner.jpg" />
        <input type="hidden" name="no_shipping" value="1" />
        <input type="hidden" name="return" value={`${hostName}thank-you?items=${items.map(item => item.slug).join()}`} />
        <input type="hidden" name="cancel_return" value={window.location.href} />

        {items.map((item, number) => (
          <React.Fragment key={number}>
            <input type="hidden" name={`item_name_${number + 1}`} value={item.name} />
            <input type="hidden" name={`amount_${number + 1}`} value={item.amount} />
          </React.Fragment>
        ))}
      </form>
    </div>
  )
}

export default PayPalCartUpload
