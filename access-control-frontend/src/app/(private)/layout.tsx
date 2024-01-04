import Link from "next/link";

const PrivateLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <main>
      <aside>
        <nav>
          <ul>
            <li>
              <Link href="produtos">Produtos</Link>
            </li>
            <li>
              <Link href="/usuarios">Usuários</Link>
            </li>

            <li>
              <Link href="/api/logout">Sair</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <section>
        {children}
      </section>
    </main>
  );
}

export default PrivateLayout;