FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 52782
EXPOSE 44398

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["WebScanner-web/WebScanner-web.csproj", "WebScanner-web/"]
RUN dotnet restore "WebScanner-web/WebScanner-web.csproj"
COPY . .
WORKDIR "/src/WebScanner-web"
RUN dotnet build "WebScanner-web.csproj" -c Release -o /app

FROM build AS publish
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -yq nodejs build-essential
RUN npm install -g npm
RUN dotnet publish "WebScanner-web.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
COPY nginx.conf.sigil .
ENTRYPOINT ["dotnet", "WebScanner-web.dll"]
