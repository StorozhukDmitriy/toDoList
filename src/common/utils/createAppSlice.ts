import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

//Что бы работать с санками внутри слайса, нам нужно создать утилитную обертку.
export const createAppSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })
