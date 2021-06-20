import Joi from "joi";
import { DisplayNameEvent, IdentityEvent } from "../enum";
import { IdentityAddress } from "../typing";
import { JOI_IDENTITY_ADDRESS, JOI_IDENTITY_DISPLAY_NAME } from "../constant";
import {
  EntityAttributes,
  EntityCreationError,
  EntityOptions,
  JOI_ENTITY_BASE,
  LindormEntity,
} from "@lindorm-io/entity";

export interface IdentityDisplayName {
  name: string;
  number: number;
}

export interface IdentityAttributes extends EntityAttributes {
  address: IdentityAddress;
  birthDate: string;
  displayName: IdentityDisplayName;
  familyName: string;
  gender: string;
  givenName: string;
  gravatar: string;
  locale: string;
  middleName: string;
  nickname: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  picture: string;
  preferredUsername: string;
  profile: string;
  website: string;
  zoneInfo: string;
}

export interface IdentityOptions extends EntityOptions {
  address?: IdentityAddress;
  birthDate?: string;
  displayName?: IdentityDisplayName;
  familyName?: string;
  gender?: string;
  givenName?: string;
  gravatar?: string;
  locale?: string;
  middleName?: string;
  nickname?: string;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  picture?: string;
  preferredUsername?: string;
  profile?: string;
  website?: string;
  zoneInfo?: string;
}

const schema = Joi.object({
  ...JOI_ENTITY_BASE,

  address: JOI_IDENTITY_ADDRESS.required(),
  birthDate: Joi.string().allow(null).required(),
  displayName: JOI_IDENTITY_DISPLAY_NAME.required(),
  familyName: Joi.string().allow(null).required(),
  gender: Joi.string().allow(null).required(),
  givenName: Joi.string().allow(null).required(),
  gravatar: Joi.string().allow(null).required(),
  locale: Joi.string().allow(null).required(),
  middleName: Joi.string().allow(null).required(),
  nickname: Joi.string().allow(null).required(),
  phoneNumber: Joi.string().allow(null).required(),
  phoneNumberVerified: Joi.boolean().required(),
  picture: Joi.string().allow(null).required(),
  preferredUsername: Joi.string().allow(null).required(),
  profile: Joi.string().allow(null).required(),
  website: Joi.string().allow(null).required(),
  zoneInfo: Joi.string().allow(null).required(),
});

export class Identity extends LindormEntity<IdentityAttributes> {
  private _address: IdentityAddress;
  private _birthDate: string;
  private _displayName: IdentityDisplayName;
  private _familyName: string;
  private _gender: string;
  private _givenName: string;
  private _gravatar: string;
  private _locale: string;
  private _middleName: string;
  private _nickname: string;
  private _phoneNumber: string;
  private _phoneNumberVerified: boolean;
  private _picture: string;
  private _preferredUsername: string;
  private _profile: string;
  private _website: string;
  private _zoneInfo: string;

  public constructor(options: IdentityOptions) {
    super(options);

    this._address = {
      country: options.address?.country || null,
      locality: options.address?.locality || null,
      postalCode: options.address?.postalCode || null,
      region: options.address?.region || null,
      streetAddress: options.address?.streetAddress || null,
    };
    this._birthDate = options.birthDate || null;
    this._displayName = {
      name: options.displayName?.name || null,
      number: options.displayName?.number || null,
    };
    this._familyName = options.familyName || null;
    this._gender = options.gender || null;
    this._givenName = options.givenName || null;
    this._gravatar = options.gravatar || null;
    this._locale = options.locale || null;
    this._middleName = options.middleName || null;
    this._nickname = options.nickname || null;
    this._phoneNumber = options.phoneNumber || null;
    this._phoneNumberVerified = options.phoneNumberVerified === true;
    this._picture = options.picture || null;
    this._preferredUsername = options.preferredUsername || null;
    this._profile = options.profile || null;
    this._website = options.website || null;
    this._zoneInfo = options.zoneInfo || null;
  }

  public get address(): IdentityAddress {
    return this._address;
  }
  public set address(address: IdentityAddress) {
    this._address = address;
    this.addEvent(IdentityEvent.ADDRESS_CHANGED, { address: this._address });
  }

  public get birthDate(): string {
    return this._birthDate;
  }
  public set birthDate(birthDate: string) {
    this._birthDate = birthDate;
    this.addEvent(IdentityEvent.BIRTH_DATE_CHANGED, { birthDate: this._birthDate });
  }

  public get displayName(): IdentityDisplayName {
    return this._displayName;
  }
  public set displayName(displayName: IdentityDisplayName) {
    this._displayName = displayName;
    this.addEvent(IdentityEvent.DISPLAY_NAME_CHANGED, { displayName: this._displayName });
  }

  public get familyName(): string {
    return this._familyName;
  }
  public set familyName(familyName: string) {
    this._familyName = familyName;
    this.addEvent(IdentityEvent.FAMILY_NAME_CHANGED, { familyName: this._familyName });
  }

  public get gender(): string {
    return this._gender;
  }
  public set gender(gender: string) {
    this._gender = gender;
    this.addEvent(IdentityEvent.GENDER_CHANGED, { gender: this._gender });
  }

  public get givenName(): string {
    return this._givenName;
  }
  public set givenName(givenName: string) {
    this._givenName = givenName;
    this.addEvent(IdentityEvent.GIVEN_NAME_CHANGED, { givenName: this._givenName });
  }

  public get gravatar(): string {
    return this._gravatar;
  }
  public set gravatar(gravatar: string) {
    this._gravatar = gravatar;
    this.addEvent(IdentityEvent.GRAVATAR_CHANGED, { gravatar: this._givenName });
  }

  public get locale(): string {
    return this._locale;
  }
  public set locale(locale: string) {
    this._locale = locale;
    this.addEvent(IdentityEvent.LOCALE_CHANGED, { locale: this._locale });
  }

  public get middleName(): string {
    return this._middleName;
  }
  public set middleName(middleName: string) {
    this._middleName = middleName;
    this.addEvent(IdentityEvent.MIDDLE_NAME_CHANGED, { middleName: this._middleName });
  }

  public get nickname(): string {
    return this._nickname;
  }
  public set nickname(nickname: string) {
    this._nickname = nickname;
    this.addEvent(IdentityEvent.NICKNAME_CHANGED, { nickname: this._nickname });
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }
  public set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
    this.addEvent(IdentityEvent.PHONE_NUMBER_CHANGED, { phoneNumber: this._phoneNumber });
  }

  public get phoneNumberVerified(): boolean {
    return this._phoneNumberVerified;
  }
  public set phoneNumberVerified(phoneNumberVerified: boolean) {
    this._phoneNumberVerified = phoneNumberVerified;
    this.addEvent(IdentityEvent.PHONE_NUMBER_VERIFIED_CHANGED, { phoneNumberVerified: this._phoneNumber });
  }

  public get picture(): string {
    return this._picture;
  }
  public set picture(picture: string) {
    this._picture = picture;
    this.addEvent(IdentityEvent.PICTURE_CHANGED, { picture: this._picture });
  }

  public get preferredUsername(): string {
    return this._preferredUsername;
  }
  public set preferredUsername(preferredUsername: string) {
    this._preferredUsername = preferredUsername;
    this.addEvent(IdentityEvent.PREFERRED_USERNAME_CHANGED, { preferredUsername: this._preferredUsername });
  }

  public get profile(): string {
    return this._profile;
  }
  public set profile(profile: string) {
    this._profile = profile;
    this.addEvent(IdentityEvent.PROFILE_CHANGED, { profile: this._profile });
  }

  public get website(): string {
    return this._website;
  }
  public set website(website: string) {
    this._website = website;
    this.addEvent(IdentityEvent.WEBSITE_CHANGED, { website: this._website });
  }

  public get zoneInfo(): string {
    return this._zoneInfo;
  }
  public set zoneInfo(zoneInfo: string) {
    this._zoneInfo = zoneInfo;
    this.addEvent(IdentityEvent.ZONE_INFO_CHANGED, { zoneInfo: this._zoneInfo });
  }

  public create(): void {
    for (const evt of this.events) {
      if (evt.name !== IdentityEvent.CREATED) continue;
      throw new EntityCreationError("Identity");
    }

    const { events, ...rest } = this.toJSON();
    this.addEvent(DisplayNameEvent.CREATED, rest);
  }

  public getKey(): string {
    return this.id;
  }

  public async schemaValidation(): Promise<void> {
    await schema.validateAsync(this.toJSON());
  }

  public toJSON(): IdentityAttributes {
    return {
      ...this.defaultJSON(),

      address: this.address,
      birthDate: this.birthDate,
      displayName: this.displayName,
      familyName: this.familyName,
      gender: this.gender,
      givenName: this.givenName,
      gravatar: this.gravatar,
      locale: this.locale,
      middleName: this.middleName,
      nickname: this.nickname,
      phoneNumber: this.phoneNumber,
      phoneNumberVerified: this.phoneNumberVerified,
      picture: this.picture,
      preferredUsername: this.preferredUsername,
      profile: this.profile,
      website: this.website,
      zoneInfo: this.zoneInfo,
    };
  }
}
