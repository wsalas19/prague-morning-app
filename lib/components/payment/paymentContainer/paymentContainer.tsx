import React, { useState } from "react";
import styles from "./paymentContainer.module.scss";
import Paper from "@/lib/components/paper/Paper";
import PaymentForm from "@/lib/components/payment/paymentContainer/paymentForm/paymentForm";
import { useForm } from "react-hook-form";
import Button from "@/lib/components/button/button";
import Divider from "@/lib/components/devider/divider";
import { useRouter } from "next/navigation";
import PaymentMethodContainer from "@/lib/components/payment/paymentContainer/paymentMethodContainer/paymentMethodContainer";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Image from "next/image";
import { ServicePlanType } from "@/lib/types/componentTypes";

const PaymentContainer = (props: ServicePlanType) => {
	/* const [isCard, setIsCard] = useState<boolean>(false);
	const [isPayPal, setIsPayPal] = useState<boolean>(true); */
	const { refresh, replace } = useRouter();

	/* const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>(); */

	const handleSubmit = async () => {
		try {
			const session = await fetch("/api/checkout", {
				method: "POST",
				body: JSON.stringify({
					title: props.title,
					price: props.price,
				}),
			});

			const data = await session.json();
			window.location.href = data.session.url;
			/* replace("/jobs");
			refresh(); */
		} catch (error: unknown) {
			console.log(error);
		}
	};
	return (
		<section className={styles["payment-container"]}>
			<div className={styles["payment-container__labels"]}>
				<label className={styles["payment-container__labels__label"]}>
					Checkout<span>*</span>
				</label>
				<label className={styles["payment-container__labels__subLabel"]}>
					Go to secure payment page powered by{" "}
					<Image src={"/images/logos/stripe.svg"} alt='stripe' width={70} height={70} />
				</label>
				<Button style={{ width: "100%" }} className={"btn-primary"} onClick={handleSubmit}>
					Go to Pay
				</Button>
			</div>
			{/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["payment-container__wrapper"]}>
          <Paper style={{width: "100%"}}>
        <PaymentMethodContainer isPayPal={isPayPal} isCard={isCard} setIsPayPal={setIsPayPal} setIsCard={setIsCard}/>
            {isCard ? <PaymentForm control={control} errors={errors}/> : <></>}
          </Paper>
          <Paper style={{width: "100%"}}>
            <div className={styles["payment-container-total-price"]}>
              <p className={styles["payment-container-total-price__title"]}>
                Order Summary
              </p>
              <div className={styles["payment-container-total-price__wrapper"]}>
                <p className={styles["payment-container-total-price__wrapper__label"]}>Balance Amount :</p>
                <p className={styles["payment-container-total-price__wrapper__price"]}>${servicePlan} CZK</p>
              </div>
              <div className={styles["payment-container-total-price__wrapper"]}>
                <p className={styles["payment-container-total-price__wrapper__label"]}>Tax (10%) :</p>
                <p className={styles["payment-container-total-price__wrapper__price"]}>${servicePlan*10/100} CZK</p>
              </div>
              <Divider/>
              <div className={styles["payment-container-total-price__wrapper"]}>
                <p className={styles["payment-container-total-price__wrapper__label"]}>Total</p>
                <p className={styles["payment-container-total-price__wrapper__price"]}>${servicePlan*10/100+servicePlan} CZK</p>
              </div>
              <Button style={{width: "100%"}} className={'btn-primary'}>Confirm your order</Button>
            </div>

          </Paper>
        </div>
      </form> */}
		</section>
	);
};

export default PaymentContainer;
