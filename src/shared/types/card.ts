export enum CardType {
	Spell = "SPELL",
	Ability = "ABILITY",
	Grimoire = "GRIMOIRE",
}

export enum Domain {
	Arcana = "ARCANA",
	Blade = "BLADE",
	Bone = "BONE",
	Codex = "CODEX",
	Grace = "GRACE",
	Midnight = "MIDNIGHT",
	Sage = "SAGE",
	Splendor = "SPLENDOR",
	Valor = "VALOR",
}

export type SkillCard = {
  id: string;
	title: string;
	description: string;
	type: CardType;
	recall: number;
	domain: Domain;
	level: number;
	imageUrl?: string;
	isHomebrew: boolean;
};

export type DomainInfo = {
	color: string;
	emblem?: string;
};

export enum AssetType {
	Banner = "banner",
	Box = "box",
	Image = "img",
}
