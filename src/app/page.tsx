"use client";

import {
  ApiOutlined,
  BulbOutlined,
  DatabaseOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Space, Typography } from "antd";

import { ResponsiveLayout } from "@/client/components/responsive-layout";
import { useI18n } from "@/client/components/i18n-provider";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const { t } = useI18n();

  const features = [
    {
      icon: <GlobalOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      title: t("home.features.i18n"),
    },
    {
      icon: <BulbOutlined style={{ fontSize: 32, color: "#52c41a" }} />,
      title: t("home.features.theme"),
    },
    {
      icon: <DatabaseOutlined style={{ fontSize: 32, color: "#faad14" }} />,
      title: t("home.features.state"),
    },
    {
      icon: <ApiOutlined style={{ fontSize: 32, color: "#eb2f96" }} />,
      title: t("home.features.api"),
    },
  ];

  return (
    <ResponsiveLayout>
      <Space orientation='vertical' size='large' style={{ width: "100%" }}>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Title>{t("home.title")}</Title>
          <Paragraph type='secondary' style={{ fontSize: 18 }}>
            {t("home.subtitle")}
          </Paragraph>
        </div>

        <Card title={t("home.features.title")}>
          <Row gutter={[16, 16]}>
            {features.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
                <Card>
                  <Space align='start'>
                    {item.icon}
                    <span>{item.title}</span>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Space>
    </ResponsiveLayout>
  );
}
