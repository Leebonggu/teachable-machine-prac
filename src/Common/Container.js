import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  margin-top: 7rem;
  padding: 0 1rem;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => (
  <Container>{children}</Container>
);
