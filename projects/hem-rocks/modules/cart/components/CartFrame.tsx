import React, { ReactElement, useCallback, useState, SyntheticEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isArray } from 'lodash'
import Cookies from 'js-cookie'
import { getCookieName } from '../../app'
import { setCartProducts } from '../../cart'
import { RootState } from '../../../index'

function CartFrame(): ReactElement {
  const { currentProject } = useSelector((state: RootState) => ({
    currentProject: state.content.currentProject,
  }))

  const dispatch = useDispatch()

  useEffect(function getCartFromCookies() {
    const cartCookie = Cookies.get(getCookieName('cart', currentProject))

    if (!cartCookie) return

    try {
      const cartProducts = JSON.parse(cartCookie)

      if (!cartProducts) return
      if (!isArray(cartProducts)) return
      if (!cartProducts.length) return

      dispatch(setCartProducts(cartProducts))
    }

    catch(err) {
      console.error('Could not get cart cookie: ' + err)
    }
  }, [])

  return (
    <div className="cart-frame" />
  )
}

export default CartFrame
