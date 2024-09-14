import typia from "typia";
import { LeaderboardImport } from "../../leaderboard";
export const isLeaderboardImport = (() => { const $io0 = (input: any): boolean => "string" === typeof input.userId && ("string" === typeof input.xp || "number" === typeof input.xp); const $io1 = (input: any): boolean => "string" === typeof input.user_id && ("string" === typeof input.xp || "number" === typeof input.xp); const $io2 = (input: any): boolean => "string" === typeof input.id && ("string" === typeof input.xp || "number" === typeof input.xp); const $io3 = (input: any): boolean => Array.isArray(input.players) && input.players.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem)); const $io4 = (input: any): boolean => Array.isArray(input.levels) && input.levels.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem)); const $iu0 = (input: any): any => (() => {
    if (undefined !== input.userId)
        return $io0(input);
    else if (undefined !== input.user_id)
        return $io1(input);
    else if (undefined !== input.id)
        return $io2(input);
    else
        return false;
})(); const $iu1 = (input: any): any => (() => {
    if (undefined !== input.players)
        return $io3(input);
    else if (undefined !== input.levels)
        return $io4(input);
    else
        return false;
})(); return (input: any): input is LeaderboardImport => null !== input && undefined !== input && (Array.isArray(input) && input.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem)) || "object" === typeof input && null !== input && $iu1(input)); })();
export const parseLeaderboardImport = (() => { const $guard = (typia.json.createAssertParse as any).guard; const $io0 = (input: any): boolean => "string" === typeof input.userId && ("string" === typeof input.xp || "number" === typeof input.xp); const $io1 = (input: any): boolean => "string" === typeof input.user_id && ("string" === typeof input.xp || "number" === typeof input.xp); const $io2 = (input: any): boolean => "string" === typeof input.id && ("string" === typeof input.xp || "number" === typeof input.xp); const $io3 = (input: any): boolean => Array.isArray(input.players) && input.players.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem)); const $io4 = (input: any): boolean => Array.isArray(input.levels) && input.levels.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem)); const $iu0 = (input: any): any => (() => {
    if (undefined !== input.userId)
        return $io0(input);
    else if (undefined !== input.user_id)
        return $io1(input);
    else if (undefined !== input.id)
        return $io2(input);
    else
        return false;
})(); const $iu1 = (input: any): any => (() => {
    if (undefined !== input.players)
        return $io3(input);
    else if (undefined !== input.levels)
        return $io4(input);
    else
        return false;
})(); const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.userId || $guard(_exceptionable, {
    path: _path + ".userId",
    expected: "string",
    value: input.userId
}, _errorFactory)) && ("string" === typeof input.xp || "number" === typeof input.xp || $guard(_exceptionable, {
    path: _path + ".xp",
    expected: "(number | string)",
    value: input.xp
}, _errorFactory)); const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.user_id || $guard(_exceptionable, {
    path: _path + ".user_id",
    expected: "string",
    value: input.user_id
}, _errorFactory)) && ("string" === typeof input.xp || "number" === typeof input.xp || $guard(_exceptionable, {
    path: _path + ".xp",
    expected: "(number | string)",
    value: input.xp
}, _errorFactory)); const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || $guard(_exceptionable, {
    path: _path + ".id",
    expected: "string",
    value: input.id
}, _errorFactory)) && ("string" === typeof input.xp || "number" === typeof input.xp || $guard(_exceptionable, {
    path: _path + ".xp",
    expected: "(number | string)",
    value: input.xp
}, _errorFactory)); const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (Array.isArray(input.players) || $guard(_exceptionable, {
    path: _path + ".players",
    expected: "Array<LeaderboardUserImport>.o1",
    value: input.players
}, _errorFactory)) && input.players.every((elem: any, _index5: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
    path: _path + ".players[" + _index5 + "]",
    expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
    value: elem
}, _errorFactory)) && $au0(elem, _path + ".players[" + _index5 + "]", true && _exceptionable) || $guard(_exceptionable, {
    path: _path + ".players[" + _index5 + "]",
    expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
    value: elem
}, _errorFactory)) || $guard(_exceptionable, {
    path: _path + ".players",
    expected: "Array<LeaderboardUserImport>.o1",
    value: input.players
}, _errorFactory); const $ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (Array.isArray(input.levels) || $guard(_exceptionable, {
    path: _path + ".levels",
    expected: "Array<LeaderboardUserImport>.o1",
    value: input.levels
}, _errorFactory)) && input.levels.every((elem: any, _index6: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
    path: _path + ".levels[" + _index6 + "]",
    expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
    value: elem
}, _errorFactory)) && $au0(elem, _path + ".levels[" + _index6 + "]", true && _exceptionable) || $guard(_exceptionable, {
    path: _path + ".levels[" + _index6 + "]",
    expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
    value: elem
}, _errorFactory)) || $guard(_exceptionable, {
    path: _path + ".levels",
    expected: "Array<LeaderboardUserImport>.o1",
    value: input.levels
}, _errorFactory); const $au0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
    if (undefined !== input.userId)
        return $ao0(input, _path, true && _exceptionable);
    else if (undefined !== input.user_id)
        return $ao1(input, _path, true && _exceptionable);
    else if (undefined !== input.id)
        return $ao2(input, _path, true && _exceptionable);
    else
        return $guard(_exceptionable, {
            path: _path,
            expected: "({ userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; } | { id: string; } & { xp: string | number; })",
            value: input
        }, _errorFactory);
})(); const $au1 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
    if (undefined !== input.players)
        return $ao3(input, _path, true && _exceptionable);
    else if (undefined !== input.levels)
        return $ao4(input, _path, true && _exceptionable);
    else
        return $guard(_exceptionable, {
            path: _path,
            expected: "(__type | __type.o1)",
            value: input
        }, _errorFactory);
})(); const __is = (input: any): input is LeaderboardImport => null !== input && undefined !== input && (Array.isArray(input) && input.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem)) || "object" === typeof input && null !== input && $iu1(input)); let _errorFactory: any; const __assert = (input: any, errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error): LeaderboardImport => {
    if (false === __is(input)) {
        _errorFactory = errorFactory;
        ((input: any, _path: string, _exceptionable: boolean = true) => (null !== input || $guard(true, {
            path: _path + "",
            expected: "(Array<LeaderboardUserImport> | __type | __type.o1)",
            value: input
        }, _errorFactory)) && (undefined !== input || $guard(true, {
            path: _path + "",
            expected: "(Array<LeaderboardUserImport> | __type | __type.o1)",
            value: input
        }, _errorFactory)) && (Array.isArray(input) && input.every((elem: any, _index4: number) => ("object" === typeof elem && null !== elem || $guard(true, {
            path: _path + "[" + _index4 + "]",
            expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
            value: elem
        }, _errorFactory)) && $au0(elem, _path + "[" + _index4 + "]", true) || $guard(true, {
            path: _path + "[" + _index4 + "]",
            expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
            value: elem
        }, _errorFactory)) || "object" === typeof input && null !== input && $au1(input, _path + "", true) || $guard(true, {
            path: _path + "",
            expected: "(Array<LeaderboardUserImport> | __type | __type.o1)",
            value: input
        }, _errorFactory) || $guard(true, {
            path: _path + "",
            expected: "(Array<LeaderboardUserImport> | __type | __type.o1)",
            value: input
        }, _errorFactory)))(input, "$input", true);
    }
    return input;
}; return (input: string, errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error): import("typia").Primitive<LeaderboardImport> => __assert(JSON.parse(input), errorFactory); })();
