import {StyleSheet, ImageBackground} from 'react-native';
import StartGameScreen from "./Screens/StartGameScreen";
import {LinearGradient} from "expo-linear-gradient";
import {StatusBar} from "expo-status-bar";
import {useState} from "react";
import GameScreen from "./Screens/GameScreen";
import GameOverScreen from "./Screens/GameOverScreen";

export default function App() {

    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0);

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    }

    function gameOverHandler(numberOfRounds) {
        setGameIsOver(true);
        setGuessRounds(numberOfRounds);
    }

    function StartNewGameHandler() {
        setUserNumber(null);
        setGuessRounds(0);
    }

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

    if (userNumber) {
        screen =
            <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
    }

    if (gameIsOver && userNumber) {
        screen =
            <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={StartNewGameHandler}/>;
    }


    return (
        <>
            <StatusBar style='light'/>
            <LinearGradient colors={['#a60a0a', '#0d031a', '#a60a0a']} style={styles.rootScreen}>
                <ImageBackground source={require('./assets/images/dice.jpg')} resizeMode={'cover'}
                                 style={styles.rootScreen}imageStyle={styles.backgroundImage}>{screen}</ImageBackground>
            </LinearGradient>
        </>
    );

}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },

    backgroundImage: {
        opacity: 0.4,
    }

})
