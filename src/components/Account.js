import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import DataContext from "../context/dataContext.js";
import { getTransactions } from "../services/my_wallet.js";
import Transactions from "./Transactions.js";

export default function Account() {
  const {
    setIsDisabled,
    dataUser,
    config,
    transactions,
    setTransactions,
    total,
    setTotal,
  } = useContext(DataContext);

  useEffect(() => {
    let valueTotal = 0;
    getTransactions(config)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => alert(err.response.data.message));

    transactions.map((register) => {
      register.type === "debit"
        ? (valueTotal -= register.value)
        : (valueTotal += register.value);
    });
    setTotal(valueTotal);
  }, []);

  return (
    <Container>
      <Header>
        <h1>Olá, {dataUser.name}</h1>
        <Link to={"/"} onClick={() => setIsDisabled(false)}>
          <ion-icon name="log-out-outline"></ion-icon>
        </Link>
      </Header>

      <div>
        {transactions.length === 0 ? (
          <RegistersSection>
            <div>
              <h1>
                Não há registros de <br></br>entrada ou saída
              </h1>
            </div>
          </RegistersSection>
        ) : (
          <Transactions />
        )}
      </div>

      <Buttons>
        <Link to={"/registerCredit"} onClick={() => setIsDisabled(false)}>
          <NewCredit>
            <ion-icon name="add-circle-outline"></ion-icon>
            <h1>
              Nova <br></br>entrada
            </h1>
          </NewCredit>
        </Link>

        <Link to={"/registerDebit"} onClick={() => setIsDisabled(false)}>
          <NewDebit>
            <ion-icon name="remove-circle-outline"></ion-icon>
            <h1>
              Nova <br></br>saída
            </h1>
          </NewDebit>
        </Link>
      </Buttons>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  background-color: var(--color-background);
  padding: 16px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 90vw;

  h1 {
    font-weight: 700;
    color: var(--color-white);
    font-size: 26px;
  }
  ion-icon {
    color: var(--color-white);
    font-size: 28px;
  }
`;

const RegistersSection = styled.div`
  background-color: var(--color-white);
  width: 90vw;
  height: 70vh;
  margin: 16px 0;
  border: 1px solid var(--color-white);
  border-radius: 5px;

  div {
    width: 90vw;
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1 {
    color: #868686;
    text-align: center;
    line-height: 24px;
  }
`;

const Buttons = styled.section`
  width: 90vw;
  display: flex;
  justify-content: space-between;
`;

const NewDebit = styled.div`
  background-color: var(--color-button);
  width: 40vw;
  height: 16vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  color: var(--color-white);
  font-size: 22px;
  line-height: 22px;

  h1 {
    font-weight: 700;
    font-size: 16px;
  }
`;

const NewCredit = styled.div`
  background-color: var(--color-button);
  width: 40vw;
  height: 16vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  color: var(--color-white);
  font-size: 22px;
  line-height: 22px;

  h1 {
    font-weight: 700;
    font-size: 16px;
  }
`;
