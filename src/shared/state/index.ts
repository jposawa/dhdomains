import { atom } from "recoil";
import { withNamespace } from "../utils";
import { SkillCard } from "../types";
import { FirebaseApp } from "firebase/app";
import { UserInfo } from "firebase/auth";

export const themeState = atom<string>({
	key: withNamespace("theme"),
	default: "light",
});

export const mapCenterState = atom<unknown>({
	key: withNamespace("mapCenter"),
	default: null,
});

export const locationsListState = atom<Record<string, Location>>({
	key: withNamespace("locationsList"),
	default: {},
});

export const editModeState = atom<boolean>({
	key: withNamespace("editMode"),
	default: false,
});

export const selectedSkillCardState = atom<SkillCard | null | undefined>({
	key: withNamespace("selectedSkillCard"),
	default: null,
});

export const skillCardsListState = atom<SkillCard[]>({
	key: withNamespace("skillCardsList"),
	default: [],
});

export const fbUserState = atom<UserInfo | null>({
	key: withNamespace("fbUserDHDomains"),
	default: null,
});

export const fbAppState = atom<FirebaseApp | null>({
	key: withNamespace("fbApp"),
	default: null,
});

export const isAuthLoadingState = atom<boolean>({
	key: withNamespace("authLoadingState"),
	default: true,
});
