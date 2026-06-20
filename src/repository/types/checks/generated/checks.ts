import * as __typia_transform__assertGuard from "typia/lib/internal/_assertGuard.js";
import { LeaderboardImport } from "../../leaderboard";
export const isLeaderboardImport = (() => { const _io0 = (input: any): boolean => "string" === typeof input.userId && ("string" === typeof input.xp || "number" === typeof input.xp); const _io1 = (input: any): boolean => "string" === typeof input.user_id && ("string" === typeof input.xp || "number" === typeof input.xp); const _io2 = (input: any): boolean => "string" === typeof input.id && ("string" === typeof input.xp || "number" === typeof input.xp); const _io3 = (input: any): boolean => Array.isArray(input.players) && input.players.every((elem: any) => "object" === typeof elem && null !== elem && _iu0(elem)); const _io4 = (input: any): boolean => Array.isArray(input.levels) && input.levels.every((elem: any) => "object" === typeof elem && null !== elem && _iu0(elem)); const _iu0 = (input: any): any => (() => {
    if (undefined !== input.userId)
        return _io0(input);
    else if (undefined !== input.user_id)
        return _io1(input);
    else if (undefined !== input.id)
        return _io2(input);
    else
        return false;
})(); const _iu1 = (input: any): any => (() => {
    if (undefined !== input.players)
        return _io3(input);
    else if (undefined !== input.levels)
        return _io4(input);
    else
        return false;
})(); return (input: any): input is LeaderboardImport => null !== input && undefined !== input && (Array.isArray(input) && input.every((elem: any) => "object" === typeof elem && null !== elem && _iu0(elem)) || "object" === typeof input && null !== input && _iu1(input)); })();
export const parseLeaderboardImport = (() => { const _io0 = (input: any): boolean => "string" === typeof input.userId && ("string" === typeof input.xp || "number" === typeof input.xp); const _io1 = (input: any): boolean => "string" === typeof input.user_id && ("string" === typeof input.xp || "number" === typeof input.xp); const _io2 = (input: any): boolean => "string" === typeof input.id && ("string" === typeof input.xp || "number" === typeof input.xp); const _io3 = (input: any): boolean => Array.isArray(input.players) && input.players.every((elem: any) => "object" === typeof elem && null !== elem && _iu0(elem)); const _io4 = (input: any): boolean => Array.isArray(input.levels) && input.levels.every((elem: any) => "object" === typeof elem && null !== elem && _iu0(elem)); const _iu0 = (input: any): any => (() => {
    if (undefined !== input.userId)
        return _io0(input);
    else if (undefined !== input.user_id)
        return _io1(input);
    else if (undefined !== input.id)
        return _io2(input);
    else
        return false;
})(); const _iu1 = (input: any): any => (() => {
    if (undefined !== input.players)
        return _io3(input);
    else if (undefined !== input.levels)
        return _io4(input);
    else
        return false;
})(); const _ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.userId || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".userId",
    expected: "string",
    value: input.userId
}, _errorFactory)) && ("string" === typeof input.xp || "number" === typeof input.xp || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".xp",
    expected: "(number | string)",
    value: input.xp
}, _errorFactory)); const _ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.user_id || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".user_id",
    expected: "string",
    value: input.user_id
}, _errorFactory)) && ("string" === typeof input.xp || "number" === typeof input.xp || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".xp",
    expected: "(number | string)",
    value: input.xp
}, _errorFactory)); const _ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".id",
    expected: "string",
    value: input.id
}, _errorFactory)) && ("string" === typeof input.xp || "number" === typeof input.xp || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".xp",
    expected: "(number | string)",
    value: input.xp
}, _errorFactory)); const _ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (Array.isArray(input.players) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".players",
    expected: "Array<LeaderboardUserImport>.o1",
    value: input.players
}, _errorFactory)) && input.players.every((elem: any, _index5: number) => ("object" === typeof elem && null !== elem || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".players[" + _index5 + "]",
    expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
    value: elem
}, _errorFactory)) && _au0(elem, _path + ".players[" + _index5 + "]", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".players[" + _index5 + "]",
    expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
    value: elem
}, _errorFactory)) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".players",
    expected: "Array<LeaderboardUserImport>.o1",
    value: input.players
}, _errorFactory); const _ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (Array.isArray(input.levels) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".levels",
    expected: "Array<LeaderboardUserImport>.o1",
    value: input.levels
}, _errorFactory)) && input.levels.every((elem: any, _index6: number) => ("object" === typeof elem && null !== elem || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".levels[" + _index6 + "]",
    expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
    value: elem
}, _errorFactory)) && _au0(elem, _path + ".levels[" + _index6 + "]", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".levels[" + _index6 + "]",
    expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
    value: elem
}, _errorFactory)) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "typia.json.createAssertParse",
    path: _path + ".levels",
    expected: "Array<LeaderboardUserImport>.o1",
    value: input.levels
}, _errorFactory); const _au0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
    if (undefined !== input.userId)
        return _ao0(input, _path, true && _exceptionable);
    else if (undefined !== input.user_id)
        return _ao1(input, _path, true && _exceptionable);
    else if (undefined !== input.id)
        return _ao2(input, _path, true && _exceptionable);
    else
        return __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "typia.json.createAssertParse",
            path: _path,
            expected: "({ userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; } | { id: string; } & { xp: string | number; })",
            value: input
        }, _errorFactory);
})(); const _au1 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
    if (undefined !== input.players)
        return _ao3(input, _path, true && _exceptionable);
    else if (undefined !== input.levels)
        return _ao4(input, _path, true && _exceptionable);
    else
        return __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "typia.json.createAssertParse",
            path: _path,
            expected: "(__type | __type.o5)",
            value: input
        }, _errorFactory);
})(); const __is = (input: any): input is LeaderboardImport => null !== input && undefined !== input && (Array.isArray(input) && input.every((elem: any) => "object" === typeof elem && null !== elem && _iu0(elem)) || "object" === typeof input && null !== input && _iu1(input)); let _errorFactory: any; const __assert = (input: any, errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error): LeaderboardImport => {
    if (false === __is(input)) {
        _errorFactory = errorFactory;
        ((input: any, _path: string, _exceptionable: boolean = true) => (null !== input || __typia_transform__assertGuard._assertGuard(true, {
            method: "typia.json.createAssertParse",
            path: _path + "",
            expected: "(Array<LeaderboardUserImport> | __type | __type.o5)",
            value: input
        }, _errorFactory)) && (undefined !== input || __typia_transform__assertGuard._assertGuard(true, {
            method: "typia.json.createAssertParse",
            path: _path + "",
            expected: "(Array<LeaderboardUserImport> | __type | __type.o5)",
            value: input
        }, _errorFactory)) && (Array.isArray(input) && input.every((elem: any, _index4: number) => ("object" === typeof elem && null !== elem || __typia_transform__assertGuard._assertGuard(true, {
            method: "typia.json.createAssertParse",
            path: _path + "[" + _index4 + "]",
            expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
            value: elem
        }, _errorFactory)) && _au0(elem, _path + "[" + _index4 + "]", true) || __typia_transform__assertGuard._assertGuard(true, {
            method: "typia.json.createAssertParse",
            path: _path + "[" + _index4 + "]",
            expected: "({ id: string; } & { xp: string | number; } | { userId: string; } & { xp: string | number; } | { user_id: string; } & { xp: string | number; })",
            value: elem
        }, _errorFactory)) || "object" === typeof input && null !== input && _au1(input, _path + "", true) || __typia_transform__assertGuard._assertGuard(true, {
            method: "typia.json.createAssertParse",
            path: _path + "",
            expected: "(Array<LeaderboardUserImport> | __type | __type.o5)",
            value: input
        }, _errorFactory) || __typia_transform__assertGuard._assertGuard(true, {
            method: "typia.json.createAssertParse",
            path: _path + "",
            expected: "(Array<LeaderboardUserImport> | __type | __type.o5)",
            value: input
        }, _errorFactory)))(input, "$input", true);
    }
    return input;
}; return (input: string, errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error): import("typia").Primitive<LeaderboardImport> => __assert(JSON.parse(input), errorFactory) as any; })();
