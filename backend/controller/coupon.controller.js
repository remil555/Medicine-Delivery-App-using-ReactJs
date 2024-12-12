
import Coupon from '../models/coupon.model.js';


export const applyCoupon = async (req, res) => {
    const { couponCode, cartItems } = req.body;

    try {
        const coupon = await Coupon.findOne({ code: couponCode }).populate('store');
        if (!coupon) {
          return res.status(400).json({ message: 'Invalid coupon code' });
        }
        // console.log(coupon)
        if (coupon.status === 'used') {
          return res.status(400).json({ message: 'Coupon code has already been used' });
        }
    
        let discountApplied = false;
        const updatedCartItems = cartItems.map(item => {
          if (item.storeName === coupon.store.name) {
            discountApplied = true;
            item.price = item.price - (item.price * (coupon.discount / 100));
          }
          return item;
        });
    
        if (!discountApplied) {
          return res.status(400).json({ message: 'Coupon code is not applicable to any items in the cart' });
        }
    
        // Update coupon status to 'used'
        coupon.status = 'used';
        await coupon.save();
    
        res.status(200).json({ updatedCartItems });
      } catch (error) {
        res.status(500).json({ message: 'Error applying coupon code', error });
      }
}
