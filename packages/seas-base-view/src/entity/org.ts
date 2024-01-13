export interface Org {
  id: string | null;
  parentId: string | number | null;
  orgName: string | null;
  orgCode: string | null;
  orgType: string | null;
  orgLevel: number | null;
  orgAddress: string | null;
  managerName: string | null;
  managerMobile: string | null;
  remarks: string | null;
  sort: number | null;
}

export const pOrg = (): Org => ({
  id: null,
  parentId: "1",
  orgName: null,
  orgCode: null,
  orgType: null,
  orgLevel: null,
  orgAddress: null,
  managerName: null,
  managerMobile: null,
  remarks: null,
  sort: null,
});

export const dOrg = (): Org => ({
  id: null,
  parentId: null,
  orgName: null,
  orgCode: null,
  orgType: null,
  orgLevel: null,
  orgAddress: null,
  managerName: null,
  managerMobile: null,
  remarks: null,
  sort: null,
});
