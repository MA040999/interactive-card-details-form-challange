import { Control, useWatch } from "react-hook-form";
import { FormInputs } from "../../schemas/formInputSchema";

const CardBack = ({ control }: { control: Control<FormInputs> }) => {

  const form = useWatch({
    control,
  });

  return (
    <div className="flex items-center px-10 justify-end ml-auto md:-mr-10 rounded-lg shadow-2xl bg-[url('/bg-card-back.png')] bg-no-repeat bg-[size:100%_100%] w-[300px] h-[150px] space-y-7 p-4 text-white">
      <p className="tracking-widest text-center">{!form.cardCVC ? "000" : form.cardCVC?.slice(0, 3)}</p>
    </div>
  )
}

export default CardBack