import { GetServerSidePropsContext } from "next";

export default function PokedexEntry({ pokemon } : { pokemon: any }) {
  return (
    <div>
      Entry
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const name = context.params?.name;
  return {
    props: {}
  }
}