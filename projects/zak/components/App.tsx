import React, { ReactElement } from 'react'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <div className="zak-widget">
        <div className="zw-layout">
          <div className="zw-left">
            <div className="zw-info">
              <div className="zw-image">

              </div>
              <div className="zw-description">

              </div>
            </div>
          </div>
          <div className="zw-right">
            <div className="zw-product-options">
              <h2>The Round Eyeglass</h2>
              {/* COMPONENT: <Picker /> */}
              <div className="zw-primary-picker">
                <h3>Frame color:</h3>
                <ul className="zw-primary-options">
                  <li className="active"
                    onClick={() => {}}>
                    <img src="" alt=""/>
                  </li>
                  <li onClick={() => {}}>
                    <img src="" alt=""/>
                  </li>
                  <li onClick={() => {}}>
                    <img src="" alt=""/>
                  </li>
                  <li onClick={() => {}}>
                    <img src="" alt=""/>
                  </li>
                  <li onClick={() => {}}>
                    <img src="" alt=""/>
                  </li>
                  <li onClick={() => {}}>
                    <img src="" alt=""/>
                  </li>
                </ul>
              </div>
              {/* COMPONENT: <Picker /> */}
              <div className="zw-lens-picker">
                <h3>Lens color:</h3>
                <ul className="zw-primary-options">
                  <li className="active"
                    onClick={() => {}}>
                    <img src="" alt=""/>
                  </li>
                  <li onClick={() => {}}>
                    <img src="" alt=""/>
                  </li>
                  <li onClick={() => {}}>
                    <img src="" alt=""/>
                  </li>
                </ul>
              </div>
              <div className="zw-option-row">
                {/* COMPONENT: <CustomSelect /> */}
                <div className="zw-custom-select">
                  <div
                    className="zw-selected-value"
                    onClick={() => {}}
                  >
                    Prescription
                  </div>
                  <div className="zw-select-options">
                    <ul>
                      <li onClick={() => {}}>
                        <img src="" alt=""/>
                      </li>
                      <li onClick={() => {}}>
                        <img src="" alt=""/>
                      </li>
                      <li onClick={() => {}}>
                        <img src="" alt=""/>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="zw-option-action">
                  <a className="zw-plus-left">
                      Do you have questions?
                  </a>
                </div>
              </div>
              <div className="zw-total-row">
                <span className="zw-total">
                  $395
                </span>
                <div className="zw-add-on">
                  <button className="zw-add-on-button" />
                  <span className="zw-add-on-label">
                    High-index 1.67 lens (+ $75)
                  </span>
                </div>
              </div>
              <div className="zw-submit-row">
                <button>
                  Add to Cart
                </button>
                <a className="zw-fit-guide-link zw-plus-left">
                  Fit Guide
                </a>
                <a className="zw-custom-link zw-arrow-right">
                  Custom Options
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
