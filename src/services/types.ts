import type { TypesFile, TypeValue, Type } from '@/types'
import TYPES from '@/data/types.json'

const types = TYPES as TypesFile

export function getType(name: TypeValue): Type {
    return types[name]
}

export function getIcon(name: TypeValue): string {
    return types[name].data.icon
}

export function getListOfTypes(): TypeValue[] {
    return Object.keys(types) as TypeValue[]
}