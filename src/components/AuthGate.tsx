import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";

import { BrandCat } from "@/components/BrandCat";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { setPendingRedirect, useDemoSession } from "@/lib/demo-session";

type GateContext = {
  isAuthenticated: boolean;
  /** Navega se houver sessão; senão pede login/criação de conta. */
  go: (path: string) => void;
};

const Ctx = createContext<GateContext | null>(null);

export function AuthGateProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useDemoSession();
  const [pending, setPending] = useState<string | null>(null);

  // Acesso livre: todo o conteúdo pode ser visto sem conta.
  const go = useCallback(
    (path: string) => {
      void navigate({ to: path });
    },
    [navigate],
  );

  const value = useMemo(() => ({ isAuthenticated, go }), [isAuthenticated, go]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <Dialog open={pending !== null} onOpenChange={(open) => !open && setPending(null)}>
        <DialogContent className="border-2 border-ink bg-paper sm:max-w-md">
          <div className="flex items-start gap-4">
            <BrandCat className="h-14 w-14 shrink-0 text-ink" />
            <div>
              <DialogTitle className="text-2xl font-black uppercase leading-none">
                Entre para continuar
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-muted-foreground">
                O mural, o mapa e as sinalizações ficam dentro do SinalizaPet. Crie sua conta
                gratuita ou entre para acessar.
              </DialogDescription>
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            <Button asChild size="lg" className="border-2 border-ink">
              <Link to="/cadastro" onClick={() => setPending(null)}>
                Criar conta gratuita
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-ink">
              <Link to="/login" onClick={() => setPending(null)}>
                Já tenho conta — entrar
              </Link>
            </Button>
            <p className="eyebrow flex items-center justify-center gap-2 pt-1 text-muted-foreground">
              <LockKeyhole className="h-3.5 w-3.5" /> Conteúdo protegido
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}

export function useAuthGate(): GateContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuthGate precisa estar dentro de AuthGateProvider.");
  return ctx;
}

/**
 * Área pública apenas para leitura: qualquer clique dentro dela pede login
 * quando não há sessão ativa.
 */
export function GatedArea({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  void to;
  return <div className={className}>{children}</div>;
}
