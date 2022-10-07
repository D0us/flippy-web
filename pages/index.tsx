import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from ".`.`/styles/Home.module.css"
import { FlipForm } from "../components/FlipForm"
import { Header } from "../components/Header"

const Home: NextPage = () => {
    return (
        <div>
            <Header />
            <div className="flex flex-row justify-center py-6">
                <FlipForm />
            </div>
        </div>
    )
}

export default Home
