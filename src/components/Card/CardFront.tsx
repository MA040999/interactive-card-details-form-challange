import { Control, useWatch } from "react-hook-form";
import { formatCardNumber } from "../../helpers/formatCardNumber";
import { prependLeadingZero } from "../../helpers/prependLeadingZero";
import { FormInputs } from "../../schemas/formInputSchema";

const CardFront = ({ control }: { control: Control<FormInputs> }) => {

  const form = useWatch({
    control,
  });

  return (
    <div className="shadow-2xl mr-auto md:ml-auto md:mr-0 rounded-lg -my-14 md:my-6 z-20 bg-[url('/bg-card-front.png')] bg-no-repeat bg-[size:100%_100%] w-[300px] min-h-[150px] max-h-[200px] overflow-hidden space-y-7 p-4 text-white">
      <img width={50} src="/card-logo.svg" alt="card-logo" />
      <div className="space-y-4">
        <p className="text-xl tracking-widest text-center">{formatCardNumber(form.cardNumber)?.slice(0, 19)}</p>
        <div className="flex justify-between gap-3">
          <p className="uppercase text-xs break-all">{!form.cardHolderName ? 'Jane Appleseed' : form.cardHolderName}</p>
          <p className="text-xs">{form.cardExpiryMonth ? prependLeadingZero(form.cardExpiryMonth)?.slice(0, 2) : '00'}/{form.cardExpiryYear ? prependLeadingZero(form.cardExpiryYear)?.slice(0, 2) : '00'}</p>
        </div>
      </div>
    </div>
  )
}

export default CardFront