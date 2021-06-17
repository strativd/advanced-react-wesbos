import React from 'react';
import Link from 'next/link';

import NavStyles from './styles/NavStyles';
import { useUser } from '../lib/useUser';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();

  const renderUserNav = user ? (
    <>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
      <SignOut />
      <button type="button" onClick={openCart}>
        My Cart
      </button>
    </>
  ) : (
    <>
      <Link href="/signin">Sign In</Link>
    </>
  );

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {renderUserNav}
    </NavStyles>
  );
}
