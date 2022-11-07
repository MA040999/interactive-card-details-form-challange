import { useForm } from "react-hook-form";
import CardBack from "./components/Card/CardBack";
import CardFront from "./components/Card/CardFront";
import ErrorMessage from "./components/Form/ErrorMessage";
import Input from "./components/Form/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputs, formInputSchema } from "./schemas/formInputSchema";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMutation } from "urql";
import { graphql } from "./gql";
import ErrorToast from "./components/Toast/ErrorToast";

const AddCardDetails = graphql(/* GraphQL */ `
  mutation AddCardDetails($data: CardDetailCreateInput!) {
    createCardDetail(data: $data) {
      cardHolderName
      cardNumber
      cardCVC
      cardExpiryMonth
      cardExpiryYear
    }
  }
`);

function App() {
  const [createResult, create] = useMutation(AddCardDetails);

  const [cardHolderNameRef] = useAutoAnimate<HTMLDivElement>();
  const [cardNumberRef] = useAutoAnimate<HTMLDivElement>();
  const [cardExpiryRef] = useAutoAnimate<HTMLFieldSetElement>();
  const [cardCVCRef] = useAutoAnimate<HTMLFieldSetElement>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    control,
  } = useForm<FormInputs>({
    resolver: zodResolver(formInputSchema),
    defaultValues: {
      cardCVC: undefined,
      cardExpiryMonth: undefined,
      cardExpiryYear: undefined,
      cardHolderName: "",
      cardNumber: "",
    },
  });

  const onSubmit = async (data: FormInputs) => {

    await create({
      data: {
        ...data,
        cardNumber: parseInt(data.cardNumber.replaceAll(" ", "")),
      },
    });

  };

  const handleContinueClick = () => {
    createResult.data = undefined

    reset()
  }

  return (
    <main className="flex flex-col min-h-screen max-w-screen md:flex-row">
      {
        <ErrorToast isOpen={createResult.error ? true : false}/>
      }
      <section className="basis-1 min-h-[35vh] md:min-h-full min-w-[35vw] bg-no-repeat bg-cover bg-[url('/bg-main-mobile.png')] md:bg-[url('/bg-main-desktop.png')]">
        <div className="flex flex-col px-4 min-h-[95%] justify-end items-center max-w-sm mx-auto md:justify-center md:flex-col-reverse md:min-w-[115%] ">
          <CardBack control={control} />
          <CardFront control={control} />
        </div>
      </section>
      <section className="basis-2 min-h-[65vh] min-w-[65vw] px-5 pt-16 flex mx-auto md:pl-28">
        {createResult.data ? (
          <div className="space-y-6 min-w-[50%] m-auto pb-5">
            <div className="space-y-4 flex flex-col items-center justify-center text-center ">
              <img src="/icon-complete.svg" alt="complete-icon" />
              <p className="text-very-dark-violet font-medium uppercase tracking-widest text-2xl">Thank you!</p>
              <p className="text-slate-500">We've added your card details</p>
            </div>
            <button
              onClick={handleContinueClick}
              className={`btn capitalize w-full bg-very-dark-violet hover:bg-very-dark-violet hover:brightness-150 focus:ring-very-dark-violet`}
            >
              Continue
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-md m-auto pb-5"
          >
            <div className="space-y-2" ref={cardHolderNameRef}>
              <Input
                label="Cardholder Name"
                register={register("cardHolderName")}
                type="text"
                error={errors.cardHolderName}
                placeholder="e.g. Jane Appleseed"
              />
              {errors.cardHolderName?.message && (
                <ErrorMessage message={errors.cardHolderName.message} />
              )}
            </div>
            <div className="space-y-2" ref={cardNumberRef}>
              <Input
                label="Card Number"
                register={register("cardNumber", {
                  onChange: ({
                    target: { value },
                  }: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(
                      "cardNumber",
                      value
                        .replace(/[^\dA-Z]/g, "")
                        .replace(/(.{4})/g, "$1 ")
                        .trim()
                    );
                  },
                })}
                type="text"
                error={errors.cardNumber}
                placeholder="e.g. 1111 2222 3333 4444"
              />
              {errors.cardNumber?.message && (
                <ErrorMessage message={errors.cardNumber.message} />
              )}
            </div>
            <div className="flex gap-x-4">
              <fieldset
                className="space-y-2 flex flex-col w-[50%]"
                name="card-expiry"
                aria-invalid={
                  errors.cardExpiryMonth || errors.cardExpiryYear
                    ? "true"
                    : "false"
                }
                ref={cardExpiryRef}
              >
                <legend className="uppercase tracking-widest min-w-max text-xs">
                  Exp. Date (MM/YY)
                </legend>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    register={register("cardExpiryMonth", {
                      valueAsNumber: true,
                    })}
                    placeholder="MM"
                    error={errors.cardExpiryMonth}
                  />
                  <Input
                    type="number"
                    register={register("cardExpiryYear", {
                      valueAsNumber: true,
                    })}
                    placeholder="YY"
                    error={errors.cardExpiryYear}
                  />
                </div>
                {(errors.cardExpiryMonth?.message ||
                  errors.cardExpiryYear?.message) && (
                  <ErrorMessage
                    message={
                      errors.cardExpiryMonth?.message ??
                      errors.cardExpiryYear?.message ??
                      ""
                    }
                  />
                )}
              </fieldset>
              <fieldset className="space-y-2 w-[50%]" ref={cardCVCRef}>
                <legend className="uppercase tracking-widest text-xs">
                  CVC
                </legend>
                <Input
                  type="number"
                  register={register("cardCVC")}
                  placeholder="e.g. 123"
                  error={errors.cardCVC}
                />
                {errors.cardCVC?.message && (
                  <ErrorMessage message={errors.cardCVC.message} />
                )}
              </fieldset>
            </div>
            <button
              type="submit"
              className={`${
                createResult.fetching ? "loading" : ""
              } btn capitalize w-full bg-very-dark-violet hover:bg-very-dark-violet hover:brightness-150 focus:ring-very-dark-violet`}
            >
              {createResult.fetching ? "Confirming..." : "Confirm"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

export default App;
