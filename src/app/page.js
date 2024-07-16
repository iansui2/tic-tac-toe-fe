// page.js
import Image from "next/image";
import styles from "./page.module.css";
import MainPage from "../components/MainPage";
import { Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW="container.lg">
      <MainPage />
    </Container>
  );
}