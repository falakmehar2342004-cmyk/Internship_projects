import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Tag, X } from 'lucide-react';
import {
  applyCoupon, isValidCoupon, normalizeCoupon, removeCoupon, selectCoupon,
} from '../features/coupon/couponSlice';

// Yahan coupon lagane ka form hai (react-hook-form se).
// NOTE: ye <form> kisi doosre <form> ke andar nahi rakhna chahiye.
export default function CouponBox() {
  const dispatch = useDispatch();
  const { code, percent } = useSelector(selectCoupon);

  // register = input ko form se jorta hai, handleSubmit = validation ke baad submit chalata hai
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { code: '' },
  });

  // Yahan form tab chalta hai jab validation pass ho jaye
  const onSubmit = (values) => {
    dispatch(applyCoupon(values.code));
    toast.success('Coupon applied', { id: 'coupon' });
    reset(); // input khali kar do
  };

  // Coupon lag chuka ho to code aur "Remove" button dikhao
  if (code) {
    return (
      <div className="notice notice-success">
        <Tag size={18} aria-hidden="true" />
        <p className="flex-1">
          <strong>{code}</strong> applied: {percent}% off
        </p>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => dispatch(removeCoupon())}>
          <X size={14} aria-hidden="true" /> Remove
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="coupon" className="label">Coupon code</label>
      <div className="flex gap-2">
        <input
          id="coupon"
          className="input"
          placeholder="Try SAVE10 or SAVE20"
          autoComplete="off"
          aria-invalid={errors.code ? 'true' : 'false'}
          // Yahan validation rules hain: pehle khali check, phir code sahi hai ya nahi
          {...register('code', {
            required: 'Enter a coupon code first.',
            validate: (value) => isValidCoupon(value) || `"${normalizeCoupon(value)}" is not a valid coupon code.`,
          })}
        />
        <button type="submit" className="btn btn-secondary">Apply</button>
      </div>
      {errors.code && <p className="field-error" role="alert">{errors.code.message}</p>}
    </form>
  );
}
