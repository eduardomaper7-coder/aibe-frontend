"use client";

import { useMemo, useState } from "react";
import {
  ExternalLink,
  Plus,
  ChevronRight,
  Globe2,
  Pencil,
  CheckCircle2,
  Clock3,
  Sparkles,
  X,
  Calendar,
  Newspaper,
  FileText,
  Link2,
} from "lucide-react";
import type { PresenceArticle, PresenceData, PresencePlatform } from "./types";
import PlansModal from "../solicitar-resenas/components/PlansModal";
type Props = {
  initialData: PresenceData;
  jobId: string | null;
  hasSubscription: boolean;
};

type ArticleModalType = "media" | "clinic" | null;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function getResolvedPlatformUrl(platform: PresencePlatform) {
  return platform.customUrl && platform.customUrl.trim().length > 0
    ? platform.customUrl
    : platform.defaultUrl;
}

function normalizeUrl(value: string) {
  return value.trim().replace(/\/+$/, "").toLowerCase();
}

function isCustomPlatformUrl(platform: PresencePlatform, url: string) {
  const clean = normalizeUrl(url);
  const defaultClean = normalizeUrl(platform.defaultUrl);
  return clean.length > 0 && clean !== defaultClean;
}

function SectionHeader({
  title,
  subtitle,
  onAdd,
  showAdd = true,
}: {
  title: string;
  subtitle: string;
  onAdd?: () => void;
  showAdd?: boolean;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      </div>

      {showAdd ? (
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-100"
        >
          <Plus className="h-4 w-4" />
          Añadir
        </button>
      ) : null}
    </div>
  );
}

function ArticleCard({ article }: { article: PresenceArticle }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      className="group block h-full min-w-[300px] max-w-[300px] rounded-2xl border border-sky-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
    >
      <div className="mb-4 overflow-hidden rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <div className="border-b border-sky-100 px-4 py-2">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-xs font-medium uppercase tracking-wide text-sky-700">
              {article.previewSource || "Vista previa"}
            </span>
            <ExternalLink className="h-4 w-4 text-sky-400 transition group-hover:text-sky-600" />
          </div>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
            {article.previewTitle || article.title}
          </h3>
          <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
            {article.previewExcerpt ||
              "Vista previa del contenido externo o publicación propia."}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="line-clamp-2 text-sm font-semibold text-slate-900">
          {article.title}
        </p>
        <p className="text-xs text-slate-500">{formatDate(article.publishedAt)}</p>
      </div>
    </a>
  );
}

function ArticleSection({
  title,
  subtitle,
  articles,
  onAdd,
  onSeeMore,
}: {
  title: string;
  subtitle: string;
  articles: PresenceArticle[];
  onAdd?: () => void;
  onSeeMore?: () => void;
}) {
  return (
    <section className="rounded-3xl border border-sky-100 bg-white/90 p-6 shadow-sm backdrop-blur">
      <SectionHeader title={title} subtitle={subtitle} onAdd={onAdd} />

      <div className="mb-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
          <Sparkles className="h-3.5 w-3.5" />
          {articles.length} elementos
        </div>

        <button
          type="button"
          onClick={onSeeMore}
          className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-50"
        >
          Ver más
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

function ProgressBar({
  active,
  total,
}: {
  active: number;
  total: number;
}) {
  const percent = total === 0 ? 0 : Math.round((active / total) * 100);

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-700">
            Nivel de presencia online
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Se calcula según los perfiles configurados con enlace propio
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-700">{percent}%</p>
          <p className="text-xs text-slate-500">
            {active} de {total} perfiles activos
          </p>
        </div>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-emerald-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function PlatformCard({
  platform,
  onChangeUrl,
}: {
  platform: PresencePlatform;
  onChangeUrl: (platform: PresencePlatform) => void;
}) {
  const resolvedUrl = getResolvedPlatformUrl(platform);
  const isActive = platform.status === "active";

  return (
    <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <a
          href={resolvedUrl}
          target="_blank"
          rel="noreferrer"
          className="flex min-w-0 items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-emerald-500 text-sm font-bold text-white shadow-sm">
            {platform.logoText}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {platform.name}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {platform.customUrl && platform.customUrl.trim().length > 0
                ? "Enlace configurado"
                : "Usando enlace genérico del directorio"}
            </p>
          </div>
        </a>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
            isActive
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
              : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
          }`}
        >
          {isActive ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <Clock3 className="h-3.5 w-3.5" />
          )}
          {isActive ? "Activo" : "Pendiente"}
        </span>
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 p-3">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          Enlace actual
        </p>
        <p className="truncate text-sm text-slate-700">{resolvedUrl}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <a
          href={resolvedUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-sky-200 px-3 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-50"
        >
          Abrir
          <ExternalLink className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={() => onChangeUrl(platform)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-500 px-3 py-2 text-sm font-medium text-white transition hover:opacity-95"
        >
          <Pencil className="h-4 w-4" />
          Poner enlace
        </button>
      </div>
    </div>
  );
}

function ModalShell({
  title,
  children,
  onClose,
  maxWidth = "max-w-2xl",
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  maxWidth?: string;
}) {
  return (
   <div className="fixed -inset-y-32 inset-x-0 z-[99999] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
  <div className={`relative z-[100000] w-full ${maxWidth} rounded-3xl bg-white shadow-2xl`}>
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

export default function PresenciaOnlineClient({
  initialData,
  jobId,
  hasSubscription,
}: Props) {
  const [data, setData] = useState(initialData);
  const [showDemoModal, setShowDemoModal] = useState(!hasSubscription);
const [showPlansModal, setShowPlansModal] = useState(false);

  const [platformModal, setPlatformModal] = useState<PresencePlatform | null>(null);
  const [platformUrlInput, setPlatformUrlInput] = useState("");

  const [articleModalType, setArticleModalType] = useState<ArticleModalType>(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleUrl, setArticleUrl] = useState("");
  const [articleDate, setArticleDate] = useState("");
  const [articleSource, setArticleSource] = useState("");

  const [seeMoreType, setSeeMoreType] = useState<ArticleModalType>(null);

  const activePlatforms = useMemo(
    () => data.platforms.filter((platform) => platform.status === "active").length,
    [data.platforms]
  );

  const openPlatformModal = (platform: PresencePlatform) => {
    setPlatformModal(platform);
    setPlatformUrlInput(platform.customUrl || "");
  };

  const savePlatformUrl = () => {
    if (!platformModal) return;

    const cleanUrl = platformUrlInput.trim();
    const nextStatus = isCustomPlatformUrl(platformModal, cleanUrl)
      ? "active"
      : "pending";

    setData((prev) => ({
      ...prev,
      platforms: prev.platforms.map((item) =>
        item.id === platformModal.id
          ? {
              ...item,
              customUrl: cleanUrl,
              status: nextStatus,
            }
          : item
      ),
    }));

    setPlatformModal(null);
    setPlatformUrlInput("");
  };

  const openAddArticleModal = (type: ArticleModalType) => {
    setArticleModalType(type);
    setArticleTitle("");
    setArticleUrl("");
    setArticleDate("");
    setArticleSource(type === "clinic" ? "Blog de la clínica" : "");
  };

  const saveArticle = () => {
    if (!articleModalType) return;
    if (!articleTitle.trim() || !articleUrl.trim() || !articleDate.trim()) return;

    const source =
      articleModalType === "clinic"
        ? "Blog de la clínica"
        : articleSource.trim() || "Medio externo";

    const newArticle: PresenceArticle = {
      id: `${articleModalType}-${Date.now()}`,
      title: articleTitle.trim(),
      publishedAt: articleDate,
      url: articleUrl.trim(),
      previewTitle: articleTitle.trim(),
      previewSource: source,
      previewExcerpt:
        articleModalType === "clinic"
          ? "Nueva publicación añadida por la clínica para pacientes."
          : "Nuevo artículo externo añadido en la sección de medios y prensa.",
      category: articleModalType,
    };

    setData((prev) => ({
      ...prev,
      mediaArticles:
        articleModalType === "media"
          ? [newArticle, ...prev.mediaArticles]
          : prev.mediaArticles,
      clinicArticles:
        articleModalType === "clinic"
          ? [newArticle, ...prev.clinicArticles]
          : prev.clinicArticles,
    }));

    setArticleModalType(null);
    setArticleTitle("");
    setArticleUrl("");
    setArticleDate("");
    setArticleSource("");
  };

  const mediaArticles = data.mediaArticles;
  const clinicArticles = data.clinicArticles;

  return (
    <div className="space-y-8 bg-gradient-to-b from-sky-50 via-white to-emerald-50/50 p-4 md:p-6">
      <header className="rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-600 via-sky-500 to-emerald-500 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Presencia online
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-sky-50">
              Presencia de la clínica en medios, publicaciones propias y perfiles
              en plataformas digitales.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm font-medium ring-1 ring-white/20">
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
            {hasSubscription ? "Suscripción activa" : "Modo demo"}
          </div>
        </div>
      </header>

      {!jobId ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          No se ha encontrado job_id en la URL. Algunas funciones del panel pueden no estar disponibles.
        </div>
      ) : null}

      <ArticleSection
        title="Medios y prensa"
        subtitle="Apariciones en medios externos y publicaciones especializadas."
        articles={mediaArticles}
        onAdd={() => openAddArticleModal("media")}
        onSeeMore={() => setSeeMoreType("media")}
      />

      <ArticleSection
        title="Publicaciones de la clínica"
        subtitle="Artículos y contenido propio para pacientes."
        articles={clinicArticles}
        onAdd={() => openAddArticleModal("clinic")}
        onSeeMore={() => setSeeMoreType("clinic")}
      />

      <section className="space-y-5 rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-6">
        <div>
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-emerald-700" />
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Perfiles y plataformas
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            Presencia en directorios y plataformas online.
          </p>
        </div>

        <ProgressBar active={activePlatforms} total={data.platforms.length} />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {data.platforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              onChangeUrl={openPlatformModal}
            />
          ))}
        </div>
      </section>

      {!hasSubscription ? (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800">
          Estás viendo una versión DEMO predeterminada porque la clínica no tiene
          suscripción activa. En este modo se muestran ejemplos y todas las
          plataformas aparecen activas por defecto.
        </div>
      ) : null}

      {platformModal ? (
        <ModalShell
          title={`Configurar enlace de ${platformModal.name}`}
          onClose={() => setPlatformModal(null)}
          maxWidth="max-w-xl"
        >
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-800">
                Enlace genérico del directorio
              </p>
              <p className="mt-1 break-all text-sm text-slate-600">
                {platformModal.defaultUrl}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Enlace de la ficha de tu clínica
              </label>
              <div className="relative">
                <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={platformUrlInput}
                  onChange={(e) => setPlatformUrlInput(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-300 px-10 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Solo se marcará como activo si introduces el enlace específico de tu clínica, distinto del genérico.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPlatformModal(null)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={savePlatformUrl}
                className="rounded-xl bg-gradient-to-r from-sky-600 to-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-95"
              >
                Guardar enlace
              </button>
            </div>
          </div>
        </ModalShell>
      ) : null}

      {articleModalType ? (
        <ModalShell
          title={
            articleModalType === "media"
              ? "Añadir artículo de medios y prensa"
              : "Añadir publicación de la clínica"
          }
          onClose={() => setArticleModalType(null)}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Título del artículo
              </label>
              <div className="relative">
                <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  placeholder="Escribe el título"
                  className="w-full rounded-xl border border-slate-300 px-10 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Enlace
              </label>
              <div className="relative">
                <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={articleUrl}
                  onChange={(e) => setArticleUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-300 px-10 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Fecha
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={articleDate}
                  onChange={(e) => setArticleDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-10 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Medio
              </label>
              <div className="relative">
                {articleModalType === "media" ? (
                  <>
                    <Newspaper className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={articleSource}
                      onChange={(e) => setArticleSource(e.target.value)}
                      placeholder="Nombre del medio"
                      className="w-full rounded-xl border border-slate-300 px-10 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    />
                  </>
                ) : (
                  <>
                    <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value="Blog de la clínica"
                      disabled
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-sm text-slate-600"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="md:col-span-2 mt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setArticleModalType(null)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={saveArticle}
                disabled={!articleTitle.trim() || !articleUrl.trim() || !articleDate.trim()}
                className="rounded-xl bg-gradient-to-r from-sky-600 to-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Guardar artículo
              </button>
            </div>
          </div>
        </ModalShell>
      ) : null}

      {seeMoreType ? (
        <ModalShell
          title={
            seeMoreType === "media"
              ? "Todos los artículos de medios y prensa"
              : "Todas las publicaciones de la clínica"
          }
          onClose={() => setSeeMoreType(null)}
          maxWidth="max-w-5xl"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {(seeMoreType === "media" ? mediaArticles : clinicArticles).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </ModalShell>
      ) : null}
            {!hasSubscription && showDemoModal ? (
        <ModalShell
          title="Está viendo una versión demo de Captación Local"
          onClose={() => setShowDemoModal(false)}
          maxWidth="max-w-xl"
        >
          <div className="space-y-5 text-center">
  <p className="text-lg font-semibold text-slate-900">
    Contrate el Plan y posicione su clínica la nº 1 en Google
  </p>

  <div className="flex justify-center gap-3">
    <button
      type="button"
      onClick={() => {
        if (!jobId) return;
        setShowDemoModal(false);
        setShowPlansModal(true);
      }}
      disabled={!jobId}
      className="rounded-xl bg-gradient-to-r from-sky-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Empezar
    </button>

    <button
      type="button"
      onClick={() => setShowDemoModal(false)}
      className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      Ver demo
    </button>
  </div>
</div>
        </ModalShell>
      ) : null}

      {showPlansModal ? (
  <PlansModal
    open={showPlansModal}
    onClose={() => setShowPlansModal(false)}
    jobId={Number(jobId)}
  />
) : null}
    </div>
  );
}