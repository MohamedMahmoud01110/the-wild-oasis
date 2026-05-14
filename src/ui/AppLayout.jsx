import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 20rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  height: 100%;
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      {/* <Footer /> */}
    </StyledAppLayout>
  );
}
