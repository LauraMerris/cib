import { firebaseConfig } from "./firebaseConfig";
import {getApp} from "firebase/app";
import {getFunctions, connectFunctionsEmulator, httpsCallable} from "firebase/functions";
import { initializeApp } from "firebase/app";
import Constants from 'expo-constants';

const app = initializeApp(firebaseConfig);
const functions = getFunctions(getApp());
const origin = Constants.manifest.debuggerHost?.split(":").shift() || "localhost";

connectFunctionsEmulator(functions, origin, 5001);

export const fetchPlats = httpsCallable(functions, 'fetchPlatforms');
export const fetchGames = httpsCallable(functions, 'fetchGames');